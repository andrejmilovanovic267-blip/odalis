import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import type { ProductListingItem } from "@/lib/product-catalog";
import { formatPrice } from "@/lib/format-price";

export function ProductCard({
  product,
  detailHref,
}: {
  product: ProductListingItem;
  detailHref?: string;
}) {
  return (
    <Link
      href={detailHref ?? `#${product.id}`}
      aria-label={`${product.name}, ${product.brand}, ${product.quantity}, ${
        product.availableForPurchase === false
          ? "Trenutno nije dostupan"
          : formatPrice(product.price)
      }`}
      className="group block min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-4"
    >
      <article id={product.id} className="flex h-full flex-col">
        <div
          className={`relative aspect-square overflow-hidden rounded-[12px] ${
            product.images ? "bg-[#E8E5E0]" : "bg-[#10263A]"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            {product.images ? (
              <Image
                src={product.images[0]}
                alt={product.imageAlt ?? product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain object-center"
              />
            ) : (
              <span className="text-sm text-[#B8B5B0]">Slika proizvoda uskoro</span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-4 sm:pt-5">
          <div className="flex flex-col">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#C9A24D]">
              {product.purpose}
            </p>
            <h2 className="mb-2 line-clamp-2 font-heading text-lg font-semibold leading-snug text-text-primary transition-colors duration-250 ease-out group-hover:text-[#D6B45F] motion-reduce:transition-none sm:text-xl">
              {product.name}
            </h2>
            <p className="h-[2.8rem] overflow-hidden text-sm leading-relaxed text-text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
              {product.shortDescription}
            </p>
            {product.freeShippingEligible && (
              <p className="mt-2 text-xs font-medium text-[#C9A24D]">
                Besplatna dostava
              </p>
            )}
            <div className="mt-[14px] text-sm leading-relaxed text-text-secondary">
              <p className="flex items-center gap-2">
                <Tag
                  aria-hidden="true"
                  className="h-3.5 w-3.5 flex-shrink-0 text-[#C9A24D]"
                  strokeWidth={1.6}
                />
                <span>
                  <span className="text-text-muted">Brend:</span>{" "}
                  {product.brand}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div className="mb-3 h-px w-full bg-white/10" />
            <div className="flex min-h-11 items-center justify-between gap-3">
              <span className="text-sm text-text-muted">
                {product.quantity}
              </span>
              {product.availableForPurchase === false ? (
                <span className="inline-flex min-h-11 items-center text-sm font-semibold text-text-muted">
                  Trenutno nije dostupan
                </span>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#C9A24D]">
                  {formatPrice(product.price)}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-250 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
