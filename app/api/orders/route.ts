import { NextRequest, NextResponse } from "next/server";
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
} from "@/lib/order-persistence";
import { sendOrderEmailNotifications } from "@/lib/order-email";
import { getAppOrigin, isAllowedAppOrigin } from "@/lib/stripe-server";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: NextRequest) {
  let appOrigin: string;
  try {
    appOrigin = getAppOrigin();
  } catch {
    console.error("[ORDERS] Application URL configuration is invalid.");
    return NextResponse.json(
      { error: "Poručivanje trenutno nije dostupno." },
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
    !isValidIdempotencyKey(body.idempotencyKey)
  ) {
    return NextResponse.json(
      { error: "Proverite podatke za dostavu i proizvode u korpi." },
      { status: 400 },
    );
  }

  try {
    const ownerEmail = getOrderOwnerEmail();
    const savedOrder = await createOrderAtomically({
      idempotencyKey: body.idempotencyKey,
      fingerprint: createOrderFingerprint("cod", customer, order),
      paymentMethod: "cod",
      customer,
      order,
      ownerEmail,
    });
    try {
      await sendOrderEmailNotifications(savedOrder.id);
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "orders.cod_email_dispatch_deferred",
          orderId: savedOrder.id,
          errorType: error instanceof Error ? error.name : "unknown",
        }),
      );
    }
    return NextResponse.json({ orderNumber: savedOrder.orderNumber });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "orders.cod_persistence_failed",
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
      { error: "Porudžbina nije sačuvana. Pokušajte ponovo." },
      { status: 503 },
    );
  }
}
