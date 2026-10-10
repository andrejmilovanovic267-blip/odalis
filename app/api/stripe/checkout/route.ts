import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  calculateTrustedOrder,
  isValidIdempotencyKey,
  parseCheckoutCustomer,
  parseCheckoutItems,
} from "@/lib/order-calculation";
import {
  createOrderAtomically,
  createOrderFingerprint,
  getOrderOwnerEmail,
  saveStripeSessionId,
  type PersistedOrder,
} from "@/lib/order-persistence";
import {
  getAppOrigin,
  getStripeClient,
  isAllowedAppOrigin,
} from "@/lib/stripe-server";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  let stripe: Stripe;
  let appOrigin: string;
  try {
    stripe = getStripeClient();
    appOrigin = getAppOrigin();
  } catch {
    console.error("[STRIPE CHECKOUT] Server configuration is invalid.");
    return NextResponse.json(
      { error: "Kartično plaćanje trenutno nije konfigurisano." },
      { status: 500 },
    );
  }

  const requestOrigin = request.headers.get("origin");
  if (requestOrigin && !isAllowedAppOrigin(requestOrigin, appOrigin)) {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 400 });
  }
  if (!isRecord(body)) {
    return NextResponse.json({ error: "Neispravan zahtev." }, { status: 400 });
  }

  const items = parseCheckoutItems(body.items);
  const customer = parseCheckoutCustomer(body.customer);
  const order = items ? calculateTrustedOrder(items) : null;
  if (
    !items ||
    !customer ||
    !order ||
    !isValidIdempotencyKey(body.attemptId)
  ) {
    return NextResponse.json(
      { error: "Proverite podatke za dostavu i proizvode u korpi." },
      { status: 400 },
    );
  }

  let savedOrder: PersistedOrder;
  try {
    savedOrder = await createOrderAtomically({
      idempotencyKey: body.attemptId,
      fingerprint: createOrderFingerprint("card", customer, order),
      paymentMethod: "card",
      customer,
      order,
      ownerEmail: getOrderOwnerEmail(),
    });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "stripe.checkout.order_persistence_failed",
        errorCode:
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          typeof error.code === "string"
            ? error.code
            : undefined,
      }),
    );
    return NextResponse.json(
      { error: "Porudžbina nije mogla biti pripremljena. Pokušajte ponovo." },
      { status: 503 },
    );
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    order.items.map(({ categorySlug, product, packageOption, quantity, unitPrice }) => ({
      quantity,
      price_data: {
        currency: "rsd",
        unit_amount: unitPrice * 100,
        product_data: {
          name: `${product.name}${packageOption ? ` — ${packageOption.label}` : ""}`,
          description: product.shortDescription.slice(0, 500),
          metadata: {
            product_id: product.id,
            product_slug: product.slug,
            category_slug: categorySlug,
            ...(packageOption ? { package_option_id: packageOption.id } : {}),
          },
        },
      },
    }));

  if (order.shipping > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "rsd",
        unit_amount: order.shipping * 100,
        product_data: {
          name: "Dostava",
          description: "Dostava porudžbine širom Srbije.",
        },
      },
    });
  }

  try {
    const customerRecord = await stripe.customers.create(
      {
        name: customer.fullName,
        phone: customer.phone,
        email: customer.email,
        address: {
          line1: customer.street,
          city: customer.city,
          postal_code: customer.postalCode,
          country: "RS",
        },
        metadata: {
          order_number: savedOrder.orderNumber,
          courier_note: customer.courierNote,
        },
      },
      { idempotencyKey: `${savedOrder.id}-customer` },
    );

    const metadata = {
      order_id: savedOrder.id,
      order_number: savedOrder.orderNumber,
      payment_method: "card",
      currency: "RSD",
    };
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        currency: "rsd",
        line_items: lineItems,
        customer: customerRecord.id,
        client_reference_id: savedOrder.id,
        metadata,
        payment_intent_data: { metadata },
        success_url: `${appOrigin}/placanje/uspesno?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appOrigin}/placanje/otkazano`,
      },
      { idempotencyKey: `${savedOrder.id}-session` },
    );

    await saveStripeSessionId(savedOrder.id, session.id);
    if (!session.url) {
      console.error(
        JSON.stringify({
          event: "stripe.checkout.session_missing_url",
          orderId: savedOrder.id,
        }),
      );
      return NextResponse.json(
        { error: "Stripe nije vratio adresu za plaćanje. Pokušajte ponovo." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "stripe.checkout.session_creation_failed",
        orderId: savedOrder.id,
        errorType: error instanceof Stripe.errors.StripeError ? error.type : "unknown",
        errorCode: error instanceof Stripe.errors.StripeError ? error.code : undefined,
        requestId: error instanceof Stripe.errors.StripeError ? error.requestId : undefined,
      }),
    );
    const message =
      error instanceof Stripe.errors.StripeError &&
      (error.code === "currency_not_supported" ||
        error.code === "parameter_invalid_enum")
        ? "RSD kartično plaćanje nije podržano za ovaj Stripe nalog."
        : "Nije moguće pokrenuti kartično plaćanje. Pokušajte ponovo.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
