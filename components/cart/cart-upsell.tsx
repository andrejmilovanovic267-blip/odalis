"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";
import type { ProductListingItem } from "@/lib/product-catalog";
import { formatPrice } from "@/lib/format-price";

export function CartUpsell({ product }: { product: ProductListingItem }) {
  const { addItem } = useCart();

  return (
    <section
      aria-labelledby="cart-upsell-heading"
      className="mb-4 border-t border-white/10 pt-3"
    >
      <h3
        id="cart-upsell-heading"
        className="mb-2 text-[10px] font-medium tracking-[0.12em] text-text-muted"
      >
        UPOTPUNI RUTINU
      </h3>
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-[6px] ${
            product.images ? "bg-[#E8E5E0]" : "bg-[#10263A]"
          }`}
        >
          {product.images ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="56px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full items-center justify-center px-1 text-center text-[8px] leading-tight text-text-muted">
              Slika proizvoda uskoro
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium leading-snug text-text-primary">
            {product.name}
          </p>
          <p className="mt-0.5 text-[11px] text-text-muted">
            {product.quantity}
          </p>
          <p className="mt-0.5 text-xs font-medium text-[#C9A24D]">
            {formatPrice(product.price)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem(product, 1)}
          aria-label={`Dodaj ${product.name} u korpu`}
          className="inline-flex min-h-11 flex-shrink-0 items-center justify-center px-2 text-xs font-medium text-[#C9A24D] transition-colors hover:text-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60 focus-visible:outline-offset-2"
        >
          + Dodaj
        </button>
      </div>
    </section>
  );
}
