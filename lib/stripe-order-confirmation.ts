import "server-only";

import type Stripe from "stripe";
import {
  applyStripePaymentStatus,
  getOrderOwnerEmail,
  getStoredStripeOrder,
} from "@/lib/order-persistence";

type ConfirmationResult =
  | {
      ok: true;
      result: "confirmed" | "already_paid";
      orderId: string;
      orderNumber: string;
    }
  | {
      ok: false;
      result:
        | "invalid_paid_session"
        | "stored_order_not_found"
        | "order_session_mismatch"
        | "order_not_pending_or_cancelled";
      status: 400 | 404 | 409;
    };

function isOrderId(value: string | null | undefined): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

export async function confirmPaidStripeSession(
  session: Stripe.Checkout.Session,
): Promise<ConfirmationResult> {
  const orderId = session.metadata?.order_id;
  if (
    session.livemode ||
    session.mode !== "payment" ||
    session.status !== "complete" ||
    session.payment_status !== "paid" ||
    session.currency !== "rsd" ||
    !isOrderId(orderId) ||
    session.client_reference_id !== orderId ||
    session.metadata?.payment_method !== "card" ||
    session.metadata?.currency !== "RSD"
  ) {
    return { ok: false, result: "invalid_paid_session", status: 400 };
  }

  const order = await getStoredStripeOrder(orderId, session.id);
  if (!order) {
    return { ok: false, result: "stored_order_not_found", status: 404 };
  }
  if (
    order.payment_method !== "card" ||
    order.order_number !== session.metadata?.order_number ||
    order.order_status === "cancelled" ||
    !Number.isSafeInteger(order.total_rsd * 100) ||
    session.amount_total !== order.total_rsd * 100
  ) {
    return { ok: false, result: "order_session_mismatch", status: 409 };
  }

  if (order.payment_status === "paid") {
    return {
      ok: true,
      result: "already_paid",
      orderId: order.id,
      orderNumber: order.order_number,
    };
  }
  if (order.payment_status !== "pending") {
    return { ok: false, result: "order_not_pending_or_cancelled", status: 409 };
  }

  const updated = await applyStripePaymentStatus(
    order.id,
    session.id,
    "paid",
    getOrderOwnerEmail(),
  );
  if (!updated) {
    return { ok: false, result: "order_not_pending_or_cancelled", status: 409 };
  }

  return {
    ok: true,
    result: "confirmed",
    orderId: order.id,
    orderNumber: order.order_number,
  };
}
