import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProductDetailPage } from "@/components/products/product-detail-page";
import { getProductBySlug, productCategories } from "@/lib/product-catalog";

type ProductRouteProps = {
  params: { categorySlug: string; productSlug: string };
};

export function generateStaticParams() {
  return productCategories.flatMap((category) =>
    category.products
      .filter((product) => product.slug !== "hydra-krema-za-lice")
      .map((product) => ({
        categorySlug: category.slug,
        productSlug: product.slug,
      })),
  );
}

export function generateMetadata({ params }: ProductRouteProps): Metadata {
  const result = getProductBySlug(params.categorySlug, params.productSlug);
  if (!result) return {};

  return {
    title: result.product.name,
    description: result.product.shortDescription,
    alternates: {
      canonical: `/proizvodi/${result.category.slug}/${result.product.slug}`,
    },
    openGraph: {
      url: `/proizvodi/${result.category.slug}/${result.product.slug}`,
      title: `${result.product.name} | Odalis`,
      description: result.product.shortDescription,
    },
  };
}

export default function ProductRoute({ params }: ProductRouteProps) {
  const result = getProductBySlug(params.categorySlug, params.productSlug);
  if (!result) notFound();

  return (
    <>
      <ProductDetailPage
        category={result.category}
        product={result.product}
      />
      <Footer />
    </>
  );
}
