"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/cart-context";
import { PaymentReturnPage } from "@/components/checkout/payment-return-page";

type PurchasedItem = {
  productId: string;
  variantId: string | null;
  quantity: number;
};

export function StripeSuccessResult({
  paid,
  orderId,
  orderNumber,
  items,
}: {
  paid: boolean;
  orderId: string | null;
  orderNumber: string | null;
  items: PurchasedItem[];
}) {
  const { clearPurchasedItems, isHydrated } = useCart();

  useEffect(() => {
    if (!paid || !orderId || !isHydrated) return;
    const marker = `odalis-cart-cleared:${orderId}`;
    if (window.sessionStorage.getItem(marker)) return;
    window.sessionStorage.setItem(marker, "1");
    clearPurchasedItems(items);
  }, [clearPurchasedItems, isHydrated, items, orderId, paid]);

  return (
    <PaymentReturnPage
      title={paid ? "Plaćanje je uspešno" : "Plaćanje još nije potvrđeno"}
      description={
        paid
          ? "Stripe je potvrdio uplatu i vaša porudžbina je sačuvana."
          : "Plaćanje još nije potvrđeno. Ako ste upravo platili, sačekajte da se potvrda obradi pre ponovnog pokušaja."
      }
      action={paid ? "Nazad na prodavnicu" : "Povratak na naplatu"}
      href={paid ? "/proizvodi" : "/checkout"}
      orderNumber={orderNumber ?? undefined}
    />
  );
}
