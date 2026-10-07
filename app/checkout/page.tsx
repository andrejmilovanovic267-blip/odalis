import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout/checkout-page";

export const metadata: Metadata = {
  title: "Završite porudžbinu",
  description: "Unesite podatke za dostavu i potvrdite porudžbinu.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
