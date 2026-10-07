import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProductDetailPage } from "@/components/products/product-detail-page";
import { faceCreamCategory } from "@/lib/product-catalog";

const product = faceCreamCategory.products.find(
  (item) => item.slug === "hydra-krema-za-lice",
);

export const metadata: Metadata = {
  title: "Hydra krema za lice",
  description: product?.shortDescription,
  alternates: {
    canonical:
      "/proizvodi/kreme-za-lice/hydra-krema-za-lice",
  },
};

export default function HydraFaceCreamPage() {
  if (!product) notFound();

  return (
    <>
      <ProductDetailPage category={faceCreamCategory} product={product} />
      <Footer />
    </>
  );
}
