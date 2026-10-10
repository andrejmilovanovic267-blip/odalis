import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  applyStripePaymentStatus,
  getOrderOwnerEmail,
  getStoredStripeOrder,
  type StoredStripeOrder,
} from "@/lib/order-persistence";
import { getStripeClient, getStripeMode } from "@/lib/stripe-server";
import { confirmPaidStripeSession } from "@/lib/stripe-order-confirmation";
import { sendOrderEmailNotifications } from "@/lib/order-email";

export const runtime = "nodejs";

function logStripeEvent(
  eventId: string,
  eventType: string,
  session: Stripe.Checkout.Session,
  result: string,
) {
  console.info(
    JSON.stringify({
      event: "stripe.checkout.webhook",
      stripeEventId: eventId,
      stripeEventType: eventType,
      stripeSessionId: session.id,
      orderId: session.metadata?.order_id ?? null,
      paymentStatus: session.payment_status,
      result,
    }),
  );
}

function isOrderId(value: string | null | undefined): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

async function processOrderSession(
  eventId: string,
  eventType: string,
  session: Stripe.Checkout.Session,
  paymentStatus: "paid" | "failed" | null,
  mode: "test" | "live",
) {
  const orderId = session.metadata?.order_id;
  if (!orderId) {
    logStripeEvent(eventId, eventType, session, "ignored_non_odalis_session");
    return { status: 400, error: "Checkout sesiji nedostaje referenca porudžbine." };
  }
  if (
    session.livemode !== (mode === "live") ||
    session.mode !== "payment" ||
    session.status !== "complete" ||
    !isOrderId(orderId) ||
    session.client_reference_id !== orderId
  ) {
    logStripeEvent(eventId, eventType, session, "rejected_unrecognized_session");
    return { status: 400, error: "Nevažeća Stripe sesija." };
  }

  let order: StoredStripeOrder | null;
  try {
    order = await getStoredStripeOrder(orderId, session.id);
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "stripe.checkout.webhook_order_lookup_failed",
        stripeEventId: eventId,
        stripeSessionId: session.id,
        orderId,
        errorCode:
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          typeof error.code === "string"
            ? error.code
            : undefined,
      }),
    );
    return { status: 500, error: "Porudžbina se trenutno ne može proveriti." };
  }

  if (!order) {
    logStripeEvent(eventId, eventType, session, "order_or_session_not_persisted");
    return { status: 500, error: "Porudžbina još nije dostupna za proveru." };
  }

  if (
    order.payment_method !== "card" ||
    order.order_status === "cancelled" ||
    session.metadata?.order_number !== order.order_number ||
    session.metadata?.payment_method !== "card" ||
    session.metadata?.currency !== "RSD" ||
    session.currency !== "rsd" ||
    !Number.isSafeInteger(order.total_rsd * 100) ||
    session.amount_total !== order.total_rsd * 100
  ) {
    logStripeEvent(eventId, eventType, session, "rejected_amount_currency_or_status_mismatch");
    return { status: 400, error: "Stripe iznos ili valuta se ne poklapaju." };
  }

  if (paymentStatus === null) {
    logStripeEvent(eventId, eventType, session, "payment_pending");
    return { status: 200 };
  }

  if (paymentStatus === "paid") {
    try {
      const confirmation = await confirmPaidStripeSession(session, mode);
      logStripeEvent(
        eventId,
        eventType,
        session,
        confirmation.result,
      );
      if (confirmation.ok) {
        try {
          await sendOrderEmailNotifications(confirmation.orderId);
        } catch (error) {
          console.error(
            JSON.stringify({
              event: "stripe.checkout.email_dispatch_deferred",
              stripeEventId: eventId,
              stripeEventType: eventType,
              stripeSessionId: session.id,
              orderId: confirmation.orderId,
              errorType: error instanceof Error ? error.name : "unknown",
            }),
          );
        }
      }
      return confirmation.ok
        ? { status: 200 }
        : {
            status:
              confirmation.result === "stored_order_not_found"
                ? 500
                : confirmation.status,
            error: "Plaćanje se ne poklapa sa sačuvanom porudžbinom.",
          };
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "stripe.checkout.webhook_confirmation_failed",
          stripeEventId: eventId,
          stripeEventType: eventType,
          stripeSessionId: session.id,
          orderId,
          errorCode:
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            typeof error.code === "string"
              ? error.code
              : undefined,
        }),
      );
      return { status: 500, error: "Potvrda plaćanja nije sačuvana." };
    }
  }

  if (session.payment_status !== "unpaid") {
    logStripeEvent(eventId, eventType, session, "payment_status_not_confirmed");
    return { status: 200 };
  }

  try {
    const updated = await applyStripePaymentStatus(
      order.id,
      session.id,
      paymentStatus,
      getOrderOwnerEmail(),
    );
    logStripeEvent(
      eventId,
      eventType,
      session,
      updated ? `payment_${paymentStatus}_persisted` : "order_not_eligible_for_update",
    );
    return updated
      ? { status: 200 }
      : { status: 400, error: "Status porudžbine ne dozvoljava ovu izmenu." };
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "stripe.checkout.webhook_order_update_failed",
        stripeEventId: eventId,
        orderId,
        errorCode:
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          typeof error.code === "string"
            ? error.code
            : undefined,
      }),
    );
    return { status: 500, error: "Status plaćanja nije sačuvan." };
  }
}

export async function POST(request: NextRequest) {
  let stripe: Stripe;
  let mode: "test" | "live";
  try {
    stripe = getStripeClient();
    mode = getStripeMode();
  } catch {
    console.error("[STRIPE WEBHOOK] Stripe configuration is invalid.");
    return NextResponse.json(
      { error: "Webhook plaćanja nije konfigurisan." },
      { status: 500 },
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[STRIPE WEBHOOK] STRIPE_WEBHOOK_SECRET is not configured.");
    return NextResponse.json(
      { error: "Webhook plaćanja nije konfigurisan." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Nedostaje potpis webhook-a." }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error(
      "[STRIPE WEBHOOK] Signature verification failed.",
      JSON.stringify({
        errorType: error instanceof Error ? error.name : "unknown",
      }),
    );
    return NextResponse.json({ error: "Nevažeći potpis webhook-a." }, { status: 400 });
  }

  if (event.livemode !== (mode === "live")) {
    console.error(
      JSON.stringify({
        event: "stripe.checkout.webhook_rejected",
        stripeEventId: event.id,
        reason: "event_mode_mismatch",
      }),
    );
    return NextResponse.json({ error: "Stripe događaj nije iz aktivnog režima." }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded" ||
    event.type === "checkout.session.async_payment_failed"
  ) {
    const eventSession = event.data.object as Stripe.Checkout.Session;
    if (eventSession.livemode !== (mode === "live")) {
      return NextResponse.json(
        { error: "Stripe sesija nije iz aktivnog režima." },
        { status: 400 },
      );
    }
    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(eventSession.id);
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "stripe.checkout.webhook_session_retrieval_failed",
          stripeEventId: event.id,
          stripeEventType: event.type,
          stripeSessionId: eventSession.id,
          errorType: error instanceof Stripe.errors.StripeError ? error.type : "unknown",
          errorCode: error instanceof Stripe.errors.StripeError ? error.code : undefined,
        }),
      );
      return NextResponse.json(
        { error: "Stripe sesiju nije moguće proveriti." },
        { status: 500 },
      );
    }

    const paymentStatus =
      session.payment_status === "paid"
        ? "paid"
        : event.type === "checkout.session.async_payment_failed"
          ? "failed"
          : null;
    const result = await processOrderSession(
      event.id,
      event.type,
      session,
      paymentStatus,
      mode,
    );
    if (result.status !== 200) {
      return NextResponse.json(
        { error: result.error ?? "Webhook obrada nije uspela." },
        { status: result.status },
      );
    }
  } else {
    console.info(
      JSON.stringify({
        event: "stripe.checkout.webhook_ignored",
        stripeEventId: event.id,
        stripeEventType: event.type,
      }),
    );
  }

  return NextResponse.json({ received: true });
}
