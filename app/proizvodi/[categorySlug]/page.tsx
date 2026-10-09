import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { ProductCategoryPage } from "@/components/products/product-category-page";
import { getProductCategory } from "@/lib/product-catalog";

type CategoryRouteProps = {
  params: { categorySlug: string };
};

export function generateMetadata({
  params,
}: CategoryRouteProps): Metadata {
  const category = getProductCategory(params.categorySlug);
  if (!category) return {};

  return {
    title: category.title,
    description: category.description,
    ...(category.products.some((product) => product.sitemapIndexable)
      ? {}
      : { robots: { index: false, follow: true } }),
    alternates: {
      canonical: `/proizvodi/${category.slug}`,
    },
    openGraph: {
      url: `/proizvodi/${category.slug}`,
      title: `${category.title} | Odalis`,
      description: category.description,
    },
  };
}

export default function ProductCategoryRoute({ params }: CategoryRouteProps) {
  const category = getProductCategory(params.categorySlug);
  if (!category) notFound();

  return (
    <>
      <ProductCategoryPage category={category} />
      <Footer />
    </>
  );
}
