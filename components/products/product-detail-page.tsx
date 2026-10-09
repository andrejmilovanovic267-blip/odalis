import Image from "next/image";
import Link from "next/link";
import { Banknote, Truck } from "lucide-react";
import { AdaptiveProductDescription } from "@/components/products/adaptive-product-description";
import { ProductPurchaseControls } from "@/components/products/product-purchase-controls";
import {
  getPackageOption,
  getProductBySlug,
  type ProductCategory,
  type ProductListingItem,
} from "@/lib/product-catalog";

function DetailedDescriptionSection({
  section,
}: {
  section: NonNullable<ProductListingItem["longDescription"]>[number];
}) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-xl font-semibold text-text-primary">
        {section.heading}
      </h2>
      <div className="space-y-3 text-base leading-relaxed text-text-secondary">
        {section.paragraphs.map(({ text, emphasis }) => (
          <p key={text}>
            {emphasis && text.includes(emphasis) ? (
              <>
                {text.slice(0, text.indexOf(emphasis))}
                <strong className="font-semibold text-text-primary">
                  {emphasis}
                </strong>
                {text.slice(text.indexOf(emphasis) + emphasis.length)}
              </>
            ) : (
              text
            )}
          </p>
        ))}
      </div>
      {section.bullets && (
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed text-text-secondary marker:text-[#C9A24D]">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProductGallery({ product }: { product: ProductListingItem }) {
  return (
    <div
      className={`relative aspect-square min-w-0 overflow-hidden rounded-[12px] ${
        product.images ? "bg-[#E8E5E0]" : "bg-[#10263A]"
      }`}
    >
      {product.images ? (
        <Image
          src={product.images[0]}
          alt={product.imageAlt ?? product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
          className="object-contain object-center"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-[#10263A] text-sm text-[#B8B5B0]">
          Slika proizvoda uskoro
        </div>
      )}
    </div>
  );
}

function IncludedProductsSection({
  product,
}: {
  product: ProductListingItem;
}) {
  if (!product.includedProducts?.length) return null;

  return (
    <section className="mx-auto mt-12 max-w-7xl">
      <h2 className="mb-5 font-heading text-xl font-semibold text-text-primary">
        Sastav proizvoda u setu
      </h2>
      <ul className="max-w-4xl space-y-5">
        {product.includedProducts.map((includedItem) => {
          const result = getProductBySlug(
            includedItem.categorySlug,
            includedItem.productSlug,
          );
          if (!result) return null;

          const packageOption = includedItem.packageOptionId
            ? getPackageOption(result.product, includedItem.packageOptionId)
            : undefined;

          return (
            <li
              key={`${includedItem.categorySlug}/${includedItem.productSlug}`}
              className="border-b border-white/10 pb-5"
            >
              <Link
                href={`/proizvodi/${result.category.slug}/${result.product.slug}`}
                className="font-medium text-text-primary transition-colors hover:text-[#D6B45F]"
              >
                {result.product.name}
              </Link>
              <p className="mt-1 text-sm text-text-muted">
                {packageOption
                  ? `Pakovanje: ${packageOption.label} · ${includedItem.quantity} pakovanje`
                  : `${includedItem.quantity} × ${result.product.quantity}`}
              </p>
              {result.product.inci && (
                <details className="mt-2 text-sm text-text-secondary">
                  <summary className="cursor-pointer text-text-muted hover:text-text-primary">
                    Sastav (INCI) ovog proizvoda
                  </summary>
                  <p className="mt-2 leading-relaxed">{result.product.inci}</p>
                </details>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function ProductDetailPage({
  category,
  product,
}: {
  category: ProductCategory;
  product: ProductListingItem;
}) {
  return (
    <main className="product-detail-page relative z-10 w-full pt-20 md:pt-24">
      <div className="container mx-auto px-4 pb-20 pt-6 sm:px-6 md:pb-28 md:pt-8">
        <nav aria-label="Putanja stranice" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <li>
              <Link
                href="/proizvodi"
                className="inline-flex min-h-11 items-center transition-colors hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
              >
                Proizvodi
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/proizvodi/${category.slug}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
              >
                {category.title}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text-secondary">
              {product.name}
            </li>
          </ol>
        </nav>

        <section
          aria-labelledby="product-title"
          className="mx-auto grid max-w-7xl min-w-0 items-start gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 2xl:gap-12"
        >
          <ProductGallery product={product} />

          <div
            data-pdp-card
            data-pdp-card-flexible={product.packageOptions?.length ? "true" : undefined}
            className={`flex w-full min-w-0 flex-col rounded-[12px] border border-[#C9A24D]/30 bg-[#10263A] p-5 sm:p-6 ${
              product.packageOptions?.length
                ? ""
                : "2xl:aspect-square 2xl:justify-between 2xl:gap-6 2xl:p-5"
            }`}
          >
            <div data-pdp-info className="flex-none">
              <div data-pdp-info-header>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#C9A24D]">
                  {product.purpose}
                </p>
                <h1
                  id="product-title"
                  className="font-heading text-3xl font-semibold leading-tight text-text-primary sm:text-4xl"
                >
                  {product.name}
                </h1>
              </div>
              <AdaptiveProductDescription
                question={product.buyCardQuestion}
                description={product.buyCardDescription ?? product.shortDescription}
                disableTruncation={Boolean(product.packageOptions?.length)}
              />

              <div
                data-pdp-info-divider
                className="mt-4 h-px w-full bg-white/10"
              />

              <dl
                data-pdp-info-metadata
                className="mt-3 space-y-1 text-sm text-text-secondary"
              >
                <div className="flex gap-2">
                  <dt className="text-text-muted">Brend:</dt>
                  <dd>{product.brand}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-text-muted">Količina:</dt>
                  <dd>{product.quantity}</dd>
                </div>
              </dl>
            </div>

            <div data-pdp-purchase className="mt-4 flex-none 2xl:mt-0">
              <ProductPurchaseControls
                product={product}
                price={product.price}
                confidenceIcons={
                  <>
                    <span className="inline-flex items-center gap-2">
                      <Banknote
                        aria-hidden="true"
                        className="h-4 w-4 text-[#C9A24D]"
                        strokeWidth={1.6}
                      />
                      Plaćanje pouzećem
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Truck
                        aria-hidden="true"
                        className="h-4 w-4 text-[#C9A24D]"
                        strokeWidth={1.6}
                      />
                      <span className="2xl:hidden">Dostava 1–3 radna dana</span>
                      <span className="hidden 2xl:inline">
                        Dostava širom Srbije · 1–3 radna dana
                      </span>
                    </span>
                    {product.freeShippingEligible && (
                      <span className="inline-flex items-center gap-2 font-medium text-[#C9A24D]">
                        BESPLATNA DOSTAVA UKLJUČENA
                      </span>
                    )}
                  </>
                }
              />
            </div>
          </div>
        </section>

        {(product.longDescription ||
          product.inci) && (
          <section className="mx-auto mt-14 max-w-7xl space-y-10">
            {product.longDescription && (
              <div className="max-w-4xl space-y-8">
                {product.longDescription.map((section) => (
                  <DetailedDescriptionSection
                    key={section.heading}
                    section={section}
                  />
                ))}
              </div>
            )}

            {product.inci && (
              <div className="max-w-7xl">
                <h2 className="mb-3 font-heading text-xl font-semibold text-text-primary">
                  Sastav (INCI)
                </h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {product.inci}
                </p>
              </div>
            )}

          </section>
        )}
        <IncludedProductsSection product={product} />
      </div>
    </main>
  );
}
