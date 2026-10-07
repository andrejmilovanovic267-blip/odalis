"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useCart } from "@/components/cart/cart-context";
import type { ProductListingItem } from "@/lib/product-catalog";

export function ProductPurchaseControls({
  product,
  confidenceIcons,
}: {
  product: ProductListingItem;
  confidenceIcons: ReactNode;
}) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  return (
    <div className="mt-6 space-y-5">
      <div>
        <p id="quantity-label" className="mb-2 text-sm text-text-secondary">
          Količina
        </p>
        <div
          className="inline-flex h-11 items-center border border-white/15"
          role="group"
          aria-labelledby="quantity-label"
        >
          <button
            type="button"
            aria-label="Smanji količinu"
            disabled={quantity <= 1}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="h-11 w-11 text-lg text-text-secondary transition-colors hover:text-[#C9A24D] disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span aria-live="polite" className="min-w-8 text-center text-sm">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Povećaj količinu"
            onClick={() => setQuantity((current) => current + 1)}
            className="h-11 w-11 text-lg text-text-secondary transition-colors hover:text-[#C9A24D]"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Dodaj ${product.name} u korpu`}
        onClick={() => addItem(product, quantity)}
        className="inline-flex min-h-14 w-full items-center justify-center bg-[#C9A24D] px-6 text-sm font-semibold tracking-[0.08em] text-[#0B1F33] transition-colors duration-250 hover:bg-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D] focus-visible:outline-offset-4"
      >
        DODAJ U KORPU
      </button>

      <div className="flex flex-col gap-2 text-sm text-text-muted sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
        {confidenceIcons}
      </div>
    </div>
  );
}
