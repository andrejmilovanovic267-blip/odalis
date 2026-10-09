"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/format-price";
import {
  getPackageOption,
  type ProductListingItem,
} from "@/lib/product-catalog";

export function ProductPurchaseControls({
  product,
  price,
  confidenceIcons,
}: {
  product: ProductListingItem;
  price: number;
  confidenceIcons: ReactNode;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedPackageOptionId, setSelectedPackageOptionId] = useState(
    product.packageOptions?.[0]?.id,
  );
  const { addItem } = useCart();
  const selectedPackageOption = getPackageOption(
    product,
    selectedPackageOptionId,
  );
  const displayedPrice = selectedPackageOption?.price ?? price;

  return (
    <div>
      <div className="text-3xl font-semibold text-[#C9A24D] sm:text-4xl">
        {formatPrice(displayedPrice)}
      </div>

      {product.packageOptions?.length ? (
        <fieldset className="mt-3">
          <legend className="mb-2 text-sm text-text-secondary">
            Izaberite pakovanje
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {product.packageOptions.map((option) => {
              const selected = option.id === selectedPackageOption?.id;
              const perMaskPrice = new Intl.NumberFormat("sr-RS", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(option.price / option.count);

              return (
                <label
                  key={option.id}
                  className={`flex min-h-[76px] cursor-pointer flex-col justify-center border px-3 py-2 transition-colors ${
                    selected
                      ? "border-[#C9A24D] bg-[#17324B]"
                      : "border-white/15 bg-[#10263A] hover:border-white/30"
                  } focus-within:outline-2 focus-within:outline-[#C9A24D] focus-within:outline-offset-2`}
                >
                  <input
                    type="radio"
                    name={`package-${product.slug}`}
                    value={option.id}
                    checked={selected}
                    disabled={product.availableForPurchase === false}
                    onChange={() => setSelectedPackageOptionId(option.id)}
                    className="sr-only"
                  />
                  <span className="flex items-center justify-between gap-2 text-sm font-medium text-text-primary">
                    {option.label}
                    <span aria-hidden="true" className="text-[#C9A24D]">
                      {selected ? "●" : "○"}
                    </span>
                  </span>
                  <span className="mt-1 text-sm text-[#C9A24D]">
                    {formatPrice(option.price)}
                  </span>
                  <span className="text-xs text-text-muted">
                    {perMaskPrice} RSD / {option.unitLabel ?? "maska"}
                  </span>
                  {option.note && (
                    <span className="mt-0.5 text-[10px] leading-tight text-text-muted">
                      {option.note}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : (
        <div className="mt-4">
          <div id="quantity-label" className="mb-1.5 text-sm text-text-secondary">
            Količina
          </div>
          <div
            className="inline-flex h-10 items-center border border-white/15"
            role="group"
            aria-labelledby="quantity-label"
          >
            <button
              type="button"
              aria-label="Smanji količinu"
              disabled={quantity <= 1 || product.availableForPurchase === false}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="h-10 w-10 text-lg text-text-secondary transition-colors hover:text-[#C9A24D] disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span aria-live="polite" className="min-w-8 text-center text-sm">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Povećaj količinu"
              disabled={product.availableForPurchase === false}
              onClick={() => setQuantity((current) => current + 1)}
              className="h-10 w-10 text-lg text-text-secondary transition-colors hover:text-[#C9A24D] disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={`Dodaj ${product.name} u korpu`}
        disabled={product.availableForPurchase === false}
        onClick={() =>
          addItem(
            product,
            selectedPackageOption ? 1 : quantity,
            selectedPackageOption?.id,
          )
        }
        className="mt-4 inline-flex min-h-12 w-full items-center justify-center bg-[#C9A24D] px-6 text-sm font-semibold tracking-[0.08em] text-[#0B1F33] transition-colors duration-250 hover:bg-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D] focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {product.availableForPurchase === false
          ? "TRENUTNO NIJE DOSTUPAN"
          : "DODAJ U KORPU"}
      </button>

      <div className="mt-3 flex flex-col gap-1 text-sm text-text-muted sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1">
        {confidenceIcons}
      </div>
    </div>
  );
}
