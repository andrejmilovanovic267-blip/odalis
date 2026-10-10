import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getStripeClient, getStripeMode } from "@/lib/stripe-server";
import { confirmPaidStripeSession } from "@/lib/stripe-order-confirmation";

export const runtime = "nodejs";

function hasValidRecoveryAuthorization(request: NextRequest) {
  const configuredSecret = process.env.STRIPE_ORDER_RECOVERY_SECRET;
  const authorization = request.headers.get("authorization");
  if (!configuredSecret || configuredSecret.length < 32 || !authorization) {
    return false;
  }

  const expected = Buffer.from(`Bearer ${configuredSecret}`);
  const received = Buffer.from(authorization);
  return (
    expected.length === received.length &&
    timingSafeEqual(expected, received)
  );
}

function isOrderId(value: string | null | undefined): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

export async function POST(request: NextRequest) {
  if (!hasValidRecoveryAuthorization(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (
    typeof body !== "object" ||
    body === null ||
    !("sessionId" in body) ||
    typeof body.sessionId !== "string" ||
    !/^cs_(?:test|live)_[A-Za-z0-9]+$/.test(body.sessionId)
  ) {
    return NextResponse.json({ error: "Invalid Checkout Session ID." }, { status: 400 });
  }

  let mode: "test" | "live";
  let session;
  try {
    const stripe = getStripeClient();
    mode = getStripeMode();
    const expectedSessionPrefix = mode === "live" ? "cs_live_" : "cs_test_";
    if (!body.sessionId.startsWith(expectedSessionPrefix)) {
      return NextResponse.json(
        { error: "Checkout Session does not match the active Stripe mode." },
        { status: 400 },
      );
    }
    session = await stripe.checkout.sessions.retrieve(body.sessionId);
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "stripe.order_recovery_session_retrieval_failed",
        errorType: error instanceof Error ? error.name : "unknown",
      }),
    );
    return NextResponse.json(
      { error: "Stripe payment could not be verified." },
      { status: 502 },
    );
  }

  const orderId = session.metadata?.order_id;
  if (!isOrderId(orderId)) {
    return NextResponse.json(
      { error: "Stripe session is not an Odalis order in the active mode." },
      { status: 409 },
    );
  }

  let confirmation;
  try {
    confirmation = await confirmPaidStripeSession(session, mode);
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "stripe.order_recovery_confirmation_failed",
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
    return NextResponse.json(
      { error: "Stored order could not be checked." },
      { status: 503 },
    );
  }

  if (!confirmation.ok) {
    return NextResponse.json(
      { error: "Stripe session does not match an eligible stored order." },
      { status: confirmation.status },
    );
  }

  return NextResponse.json({
    orderNumber: confirmation.orderNumber,
    paymentStatus: "paid",
    alreadyReconciled: confirmation.result === "already_paid",
  });
}
