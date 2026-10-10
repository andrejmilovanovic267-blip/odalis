import { redirect } from "next/navigation";

export default function CheckoutCancelPage(): never {
  redirect("/placanje/otkazano");
}
