import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { ProductCategoryPage } from "@/components/products/product-category-page";
import { faceCreamCategory } from "@/lib/product-catalog";

const title = "Kreme za lice | Odalis";
const description =
  "Pažljivo odabrana nega za svakodnevnu rutinu tvoje kože.";

export const metadata: Metadata = {
  title: "Kreme za lice",
  description,
  alternates: {
    canonical: "/proizvodi/kreme-za-lice",
  },
  openGraph: {
    url: "/proizvodi/kreme-za-lice",
    title,
    description,
  },
};

export default function FaceCreamsPage() {
  return (
    <>
      <ProductCategoryPage category={faceCreamCategory} />
      <Footer />
    </>
  );
}
