export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_PRICE = 500;

export function calculateShipping(
  productSubtotal: number,
  hasFreeShippingEligibleProduct = false,
) {
  const isFree =
    hasFreeShippingEligibleProduct ||
    productSubtotal >= FREE_SHIPPING_THRESHOLD;
  return {
    isFree,
    isFreeByProduct: hasFreeShippingEligibleProduct,
    cost: isFree ? 0 : STANDARD_SHIPPING_PRICE,
    remainingForFree: Math.max(0, FREE_SHIPPING_THRESHOLD - productSubtotal),
  };
}
