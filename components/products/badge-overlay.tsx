import type { ProductListingItem } from "@/lib/product-catalog";

export function BadgeOverlay({
  product,
}: {
  product: Pick<ProductListingItem, "freeEbook">;
}) {
  if (!product.freeEbook) return null;

  return (
    <div className="pointer-events-none absolute left-3 top-3 z-10">
      <span className="flex aspect-square h-[76px] w-[76px] flex-col items-center justify-center rounded-full border-2 border-white/90 bg-[#247A50] text-center text-[10px] font-bold leading-tight text-white shadow-[0_4px_14px_rgba(0,0,0,0.32)] ring-2 ring-[#C9A24D]/70 sm:h-[88px] sm:w-[88px] sm:text-[11px]">
        <span>+</span>
        <span>Besplatan</span>
        <span>eBook</span>
      </span>
    </div>
  );
}
