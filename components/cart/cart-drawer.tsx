"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/lib/format-price";
import { calculateShipping } from "@/lib/shipping";
import { getCartUpsell } from "@/lib/product-catalog";
import { CartUpsell } from "@/components/cart/cart-upsell";

export function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = document.getElementById("odalis-cart-dialog");
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [closeCart, isCartOpen]);

  const continueShopping = () => {
    closeCart();
    if (pathname !== "/proizvodi") router.push("/proizvodi");
  };
  const checkout = () => {
    closeCart();
    router.push("/checkout");
  };
  const shipping = calculateShipping(
    subtotal,
    items.some(({ product }) => product.freeShippingEligible),
  );
  const recommendation = getCartUpsell(items);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Zatvori korpu"
            className="fixed inset-0 z-[1100] cursor-default bg-[#050F1A]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
          />
          <motion.aside
            id="odalis-cart-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="odalis-cart-title"
            className="fixed inset-y-0 right-0 z-[1101] flex w-full max-w-[480px] flex-col border-l border-[#C9A24D]/25 bg-[#0D1F32] text-text-primary"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="flex min-h-20 items-center justify-between border-b border-white/10 px-5 sm:px-7">
              <h2 id="odalis-cart-title" className="font-heading text-xl font-semibold">
                Korpa
                {totalItems > 0 && (
                  <span className="ml-2 text-sm font-normal text-text-muted">
                    ({totalItems})
                  </span>
                )}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Zatvori korpu"
                onClick={closeCart}
                className="inline-flex h-11 w-11 items-center justify-center text-text-secondary transition-colors hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag
                  aria-hidden="true"
                  className="mb-5 h-8 w-8 text-[#C9A24D]"
                  strokeWidth={1.5}
                />
                <p className="mb-5 text-text-secondary">Tvoja korpa je prazna.</p>
                <button
                  type="button"
                  onClick={continueShopping}
                  className="inline-flex min-h-11 items-center justify-center border border-[#C9A24D]/60 px-5 text-sm text-[#C9A24D] transition-colors hover:bg-[#C9A24D]/10 focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60"
                >
                  Pogledaj proizvode
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-2 sm:px-7">
                  <ul className="divide-y divide-white/10">
                    {items.map((item) => {
                      const {
                        product,
                        quantity,
                        categorySlug,
                        productSlug,
                        packageOption,
                        packageOptionId,
                      } = item;
                      const unitPrice = packageOption?.price ?? product.price;
                      return (
                      <li
                        key={`${categorySlug}/${productSlug}/${packageOptionId ?? ""}`}
                        className="flex gap-4 py-5"
                      >
                        <div
                          className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-[8px] ${
                            product.images ? "bg-[#E8E5E0]" : "bg-[#10263A]"
                          }`}
                        >
                          {product.images ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex h-full items-center justify-center px-2 text-center text-[10px] leading-tight text-text-muted">
                              Slika proizvoda uskoro
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-heading text-sm font-medium leading-snug text-text-primary">
                                {product.name}
                              </p>
                              <p className="mt-1 text-xs text-text-muted">
                                {packageOption
                                  ? `Pakovanje: ${packageOption.label}`
                                  : product.quantity}
                              </p>
                              {packageOption && (
                                <p className="mt-1 text-xs text-text-muted">
                                  Broj pakovanja: {quantity}
                                </p>
                              )}
                            </div>
                            <div className="whitespace-nowrap text-right">
                              <p className="text-sm font-medium text-[#C9A24D]">
                                {packageOption
                                  ? `${formatPrice(unitPrice)} / pakovanje`
                                  : formatPrice(unitPrice)}
                              </p>
                              {packageOption && (
                                <p className="mt-1 text-xs text-text-muted">
                                  Ukupno: {formatPrice(unitPrice * quantity)}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div
                              role="group"
                              aria-label={`Količina pakovanja za ${product.name}${packageOption ? `, ${packageOption.label}` : ""}`}
                              className="inline-flex h-9 items-center border border-white/15"
                            >
                              <button
                                type="button"
                                aria-label={`Smanji količinu za ${product.name}`}
                                disabled={quantity <= 1}
                                onClick={() =>
                                  decreaseQuantity(
                                    categorySlug,
                                    productSlug,
                                    packageOptionId,
                                  )
                                }
                                className="h-9 w-9 text-text-secondary transition-colors hover:text-[#C9A24D] disabled:opacity-40"
                              >
                                <Minus aria-hidden="true" className="mx-auto h-3.5 w-3.5" />
                              </button>
                              <span
                                aria-live="polite"
                                className="min-w-8 text-center text-xs"
                              >
                                {quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`Povećaj količinu za ${product.name}`}
                                onClick={() =>
                                  increaseQuantity(
                                    categorySlug,
                                    productSlug,
                                    packageOptionId,
                                  )
                                }
                                className="h-9 w-9 text-text-secondary transition-colors hover:text-[#C9A24D]"
                              >
                                <Plus aria-hidden="true" className="mx-auto h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button
                              type="button"
                              aria-label={`Ukloni ${product.name} iz korpe`}
                              onClick={() =>
                                removeItem(
                                  categorySlug,
                                  productSlug,
                                  packageOptionId,
                                )
                              }
                              className="inline-flex min-h-9 items-center gap-1.5 text-xs text-text-muted transition-colors hover:text-[#C9A24D] focus-visible:outline-2 focus-visible:outline-[#C9A24D]/60"
                            >
                              <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                              Ukloni
                            </button>
                          </div>
                        </div>
                      </li>
                    )})}
                  </ul>
                </div>

                <div className="border-t border-white/10 bg-[#0D1F32] px-5 pb-5 pt-4 sm:px-7 sm:pb-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-text-secondary">Međuzbir</span>
                    <span className="text-lg font-semibold text-[#C9A24D]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-text-secondary">Dostava</span>
                    <span className={shipping.isFree ? "text-[#C9A24D]" : "text-text-secondary"}>
                      {shipping.isFree ? "BESPLATNO" : formatPrice(shipping.cost)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    {shipping.isFreeByProduct
                      ? "Besplatna dostava uključena u set."
                      : shipping.isFree
                      ? "Ostvarili ste besplatnu dostavu."
                      : `Još ${formatPrice(shipping.remainingForFree)} do besplatne dostave.`}
                  </p>
                  {recommendation && <CartUpsell product={recommendation} />}
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-sm font-medium text-text-primary">Ukupno</span>
                    <span className="text-lg font-semibold text-[#C9A24D]">
                      {formatPrice(subtotal + shipping.cost)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={checkout}
                    className="mt-5 inline-flex min-h-14 w-full items-center justify-center bg-[#C9A24D] px-5 text-sm font-semibold tracking-[0.06em] text-[#0B1F33] transition-colors hover:bg-[#D6B45F] focus-visible:outline-2 focus-visible:outline-[#C9A24D] focus-visible:outline-offset-4"
                  >
                    NASTAVI NA PORUČIVANJE
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
