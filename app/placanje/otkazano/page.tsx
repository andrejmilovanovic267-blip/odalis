import { PaymentReturnPage } from "@/components/checkout/payment-return-page";

export default function PaymentCancelledPage() {
  return (
    <PaymentReturnPage
      title="Plaćanje nije završeno"
      description="Plaćanje karticom je otkazano ili nije završeno. Vaša korpa je sačuvana, pa možete bezbedno da se vratite na naplatu i pokušate ponovo."
      action="Povratak na naplatu"
      href="/checkout"
    />
  );
}
