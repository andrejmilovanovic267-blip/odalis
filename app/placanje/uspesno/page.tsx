import { StripeSuccessResult } from "@/components/checkout/stripe-success-result";
import {
  getStoredStripeOrder,
  getStripeOrderItems,
} from "@/lib/order-persistence";
import { getStripeClient } from "@/lib/stripe-server";

type PaymentSuccessPageProps = {
  searchParams: { session_id?: string | string[] };
};

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const sessionId = searchParams.session_id;
  let paid = false;
  let orderId: string | null = null;
  let orderNumber: string | null = null;
  let items: Awaited<ReturnType<typeof getStripeOrderItems>> = [];

  if (
    typeof sessionId === "string" &&
    /^cs_test_[A-Za-z0-9]+$/.test(sessionId)
  ) {
    try {
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      const candidateOrderId = session.metadata?.order_id;
      if (
        !session.livemode &&
        session.mode === "payment" &&
        session.payment_status === "paid" &&
        session.currency === "rsd" &&
        typeof session.amount_total === "number" &&
        typeof candidateOrderId === "string" &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
          candidateOrderId,
        ) &&
        session.metadata?.payment_method === "card" &&
        session.metadata?.currency === "RSD" &&
        session.client_reference_id === candidateOrderId
      ) {
        const order = await getStoredStripeOrder(candidateOrderId, session.id);
        if (
          order &&
          order.payment_method === "card" &&
          session.metadata?.order_number === order.order_number &&
          order.payment_status === "paid" &&
          order.order_status !== "cancelled" &&
          session.amount_total === order.total_rsd * 100
        ) {
          items = await getStripeOrderItems(order.id);
          paid = true;
          orderId = order.id;
          orderNumber = order.order_number;
        } else if (
          order &&
          order.payment_method === "card" &&
          session.metadata?.order_number === order.order_number &&
          order.order_status !== "cancelled" &&
          session.amount_total === order.total_rsd * 100
        ) {
          orderNumber = order.order_number;
        }
      }
    } catch (error) {
      console.error(
        JSON.stringify({
          event: "stripe.checkout.success_page_verification_failed",
          errorType: error instanceof Error ? error.name : "unknown",
        }),
      );
    }
  }

  return (
    <StripeSuccessResult
      paid={paid}
      orderId={orderId}
      orderNumber={orderNumber}
      items={items}
    />
  );
}
