import Image from "next/image";
import Link from "next/link";
import { Banknote, Truck } from "lucide-react";
import { ProductPurchaseControls } from "@/components/products/product-purchase-controls";
import type { ProductCategory, ProductListingItem } from "@/lib/product-catalog";
import { formatPrice } from "@/lib/format-price";

function ProductGallery({ product }: { product: ProductListingItem }) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-[12px] ${
        product.images ? "bg-[#E8E5E0]" : "bg-[#10263A]"
      }`}
    >
      {product.images ? (
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
          className="object-cover object-center"
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-[#10263A] text-sm text-[#B8B5B0]">
          Slika proizvoda uskoro
        </div>
      )}
    </div>
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
          className="mx-auto grid max-w-7xl items-stretch gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          <ProductGallery product={product} />

          <div className="h-full rounded-[12px] border border-[#C9A24D]/30 bg-[#10263A] p-6 md:p-7 lg:p-8">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#C9A24D]">
                {product.purpose}
              </p>
              <h1
                id="product-title"
                className="font-heading text-3xl font-semibold leading-tight text-text-primary sm:text-4xl"
              >
                {product.name}
              </h1>
              <p className="mt-3 max-w-prose text-base leading-relaxed text-text-secondary">
                {product.shortDescription}
              </p>
            </div>

            <div className="my-5 h-px w-full bg-white/10" />

            <dl className="space-y-1.5 text-sm text-text-secondary">
              <div className="flex gap-2">
                <dt className="text-text-muted">Brend:</dt>
                <dd>{product.brand}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-text-muted">Zemlja porekla:</dt>
                <dd>{product.countryOfOrigin}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-text-muted">Količina:</dt>
                <dd>{product.quantity}</dd>
              </div>
            </dl>

            <p className="mt-5 text-3xl font-semibold text-[#C9A24D] sm:text-4xl">
              {formatPrice(product.price)}
            </p>

            <ProductPurchaseControls
              product={product}
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
                    Dostava širom Srbije
                  </span>
                </>
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
