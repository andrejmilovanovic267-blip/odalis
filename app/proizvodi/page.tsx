import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { ProductTypesSection } from "@/components/products/product-types-section";

const title = "Proizvodi za negu lica i kože";
const description =
  "Otkrijte Odalis proizvode za negu lica i kože — pažljivo odabrane kreme, maske i setove za jednostavnu svakodnevnu rutinu.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/proizvodi",
  },
  openGraph: {
    url: "/proizvodi",
    title: `${title} | Odalis`,
    description,
  },
};

export default function ProductsPage() {
  return (
    <>
      <main className="relative z-10 overflow-x-hidden w-full pt-20 md:pt-24">
        <ProductTypesSection />
      </main>
      <Footer />
    </>
  );
}
