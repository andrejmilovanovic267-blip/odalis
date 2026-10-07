import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import type { ProductCategory } from "@/lib/product-catalog";
import { ProductCard } from "@/components/products/product-card";

export function ProductCategoryPage({
  category,
}: {
  category: ProductCategory;
}) {
  return (
    <>
      <main className="product-category-page relative z-10 w-full overflow-x-hidden pt-20 md:pt-24">
        <section className="container mx-auto px-4 pb-12 pt-6 sm:px-6 md:pb-14 md:pt-8">
          <nav aria-label="Putanja stranice" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
              <li>
                <Link
                  href="/proizvodi"
                  className="min-h-11 inline-flex items-center transition-colors duration-200 hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
                >
                  Proizvodi
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-text-secondary">
                {category.title}
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <SectionHeading
              as="h1"
              className="mb-0 text-3xl md:text-4xl lg:text-5xl"
            >
              {category.title}
            </SectionHeading>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              {category.description}
            </p>
          </div>
        </section>

        <section
          id="products"
          aria-label={category.title}
          className="container mx-auto px-4 pb-20 sm:px-6 md:pb-28"
        >
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:gap-x-8 lg:grid-cols-3">
            {category.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                detailHref={
                  product.detailPage
                    ? `/proizvodi/${category.slug}/${product.slug}`
                    : undefined
                }
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="category-education"
          className="border-t border-white/10 px-4 py-14 sm:px-6 md:py-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="category-education"
              className="mb-4 font-heading text-2xl font-semibold text-text-primary sm:text-3xl"
            >
              {category.educationTitle}
            </h2>
            <p className="text-base leading-relaxed text-text-secondary">
              {category.educationIntro}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
