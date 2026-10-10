import "server-only";

import { createHash } from "node:crypto";
import type { CheckoutCustomer, TrustedOrder } from "@/lib/order-calculation";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type OrderPaymentMethod = "cod" | "card";

export type PersistedOrder = {
  id: string;
  orderNumber: string;
  created: boolean;
};

export function getOrderOwnerEmail() {
  const email = process.env.ODALIS_OWNER_EMAIL?.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("ODALIS_OWNER_EMAIL is not configured.");
  }
  return email;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStoredStripeOrder(value: unknown): value is StoredStripeOrder {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.order_number === "string" &&
    (value.payment_method === "cod" || value.payment_method === "card") &&
    (value.payment_status === "pending" ||
      value.payment_status === "paid" ||
      value.payment_status === "failed") &&
    (value.order_status === "new" ||
      value.order_status === "processing" ||
      value.order_status === "shipped" ||
      value.order_status === "delivered" ||
      value.order_status === "cancelled") &&
    typeof value.total_rsd === "number" &&
    (typeof value.stripe_session_id === "string" ||
      value.stripe_session_id === null)
  );
}

function getRpcOrder(value: unknown): PersistedOrder | null {
  const row = Array.isArray(value) ? value[0] : value;
  if (
    !isRecord(row) ||
    typeof row.order_id !== "string" ||
    typeof row.order_number !== "string" ||
    typeof row.created !== "boolean"
  ) {
    return null;
  }

  return {
    id: row.order_id,
    orderNumber: row.order_number,
    created: row.created,
  };
}

export function createOrderFingerprint(
  paymentMethod: OrderPaymentMethod,
  customer: CheckoutCustomer,
  order: TrustedOrder,
) {
  const canonicalOrder = {
    paymentMethod,
    customer,
    items: order.items.map(({ product, packageOption, quantity, unitPrice }) => ({
      productId: product.id,
      variantId: packageOption?.id ?? null,
      quantity,
      unitPrice,
    })),
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
  };

  return createHash("sha256").update(JSON.stringify(canonicalOrder)).digest("hex");
}

export async function createOrderAtomically({
  idempotencyKey,
  fingerprint,
  paymentMethod,
  customer,
  order,
  ownerEmail,
}: {
  idempotencyKey: string;
  fingerprint: string;
  paymentMethod: OrderPaymentMethod;
  customer: CheckoutCustomer;
  order: TrustedOrder;
  ownerEmail: string;
}): Promise<PersistedOrder> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("create_order_with_items", {
    p_idempotency_key: idempotencyKey,
    p_idempotency_hash: fingerprint,
    p_order: {
      customer_name: customer.fullName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: customer.street,
      shipping_city: customer.city,
      shipping_postal_code: customer.postalCode,
      shipping_country: "RS",
      customer_note: customer.courierNote || null,
      payment_method: paymentMethod,
      subtotal_rsd: order.subtotal,
      shipping_rsd: order.shipping,
      total_rsd: order.total,
    },
    p_owner_email: ownerEmail,
    p_items: order.items.map(
      ({ product, packageOption, quantity, unitPrice, lineTotal }) => ({
        product_id: product.id,
        product_name: product.name,
        variant_id: packageOption?.id ?? null,
        variant_name: packageOption?.label ?? null,
        quantity,
        unit_price_rsd: unitPrice,
        line_total_rsd: lineTotal,
      }),
    ),
  });

  if (error) {
    const dbError = new Error("Atomic order write failed.");
    Object.assign(dbError, { code: error.code });
    throw dbError;
  }

  const persistedOrder = getRpcOrder(data);
  if (!persistedOrder) {
    throw new Error("Atomic order write returned an invalid result.");
  }
  return persistedOrder;
}

export async function saveStripeSessionId(orderId: string, sessionId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .update({ stripe_session_id: sessionId })
    .eq("id", orderId)
    .is("stripe_session_id", null)
    .select("stripe_session_id")
    .maybeSingle();

  if (error) {
    const dbError = new Error("Stripe session association failed.");
    Object.assign(dbError, { code: error.code });
    throw dbError;
  }
  if (data?.stripe_session_id === sessionId) return;

  const { data: existing, error: lookupError } = await supabase
    .from("orders")
    .select("stripe_session_id")
    .eq("id", orderId)
    .maybeSingle();
  if (lookupError) {
    const dbError = new Error("Stripe session association verification failed.");
    Object.assign(dbError, { code: lookupError.code });
    throw dbError;
  }
  if (existing?.stripe_session_id !== sessionId) {
    throw new Error("Stripe session could not be associated with its order.");
  }
}

export type StoredStripeOrder = {
  id: string;
  order_number: string;
  payment_method: "cod" | "card";
  payment_status: "pending" | "paid" | "failed";
  order_status: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  total_rsd: number;
  stripe_session_id: string | null;
};

export async function getStoredStripeOrder(orderId: string, sessionId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("orders")
    .select(
      "id,order_number,payment_method,payment_status,order_status,total_rsd,stripe_session_id",
    )
    .eq("id", orderId)
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  if (error) {
    const dbError = new Error("Stored Stripe order lookup failed.");
    Object.assign(dbError, { code: error.code });
    throw dbError;
  }
  return isStoredStripeOrder(data) ? data : null;
}

export async function getStripeOrderItems(orderId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("order_items")
    .select("product_id,variant_id,quantity")
    .eq("order_id", orderId);
  if (error) {
    const dbError = new Error("Stored order item lookup failed.");
    Object.assign(dbError, { code: error.code });
    throw dbError;
  }
  if (!data) return [];
  return data.map((item) => ({
    productId: item.product_id,
    variantId: item.variant_id,
    quantity: item.quantity,
  }));
}

export async function applyStripePaymentStatus(
  orderId: string,
  sessionId: string,
  paymentStatus: "paid" | "failed",
  ownerEmail: string,
) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.rpc("apply_stripe_order_payment", {
    p_order_id: orderId,
    p_stripe_session_id: sessionId,
    p_payment_status: paymentStatus,
    p_owner_email: ownerEmail,
  });
  if (error) {
    const dbError = new Error("Stripe order status update failed.");
    Object.assign(dbError, { code: error.code });
    throw dbError;
  }
  return data === true;
}
