import { PaymentReturnPage } from "@/components/checkout/payment-return-page";

export default function CheckoutSuccessPage() {
  return (
    <PaymentReturnPage
      title="Status plaćanja se proverava"
      description="Vraćeni ste sa Stripe Checkout-a. Plaćanje još nije potvrđeno i porudžbina nije označena kao plaćena. Potvrda će biti moguća nakon serverske provere."
      action="Nazad na prodavnicu"
      href="/proizvodi"
    />
  );
}
