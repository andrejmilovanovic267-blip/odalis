export const EBOOK_MINIMUM_SUBTOTAL_RSD = 1499;

export function isEbookEligibleSubtotal(subtotal: number) {
  return subtotal >= EBOOK_MINIMUM_SUBTOTAL_RSD;
}

export function getEbookPromotionMessage(subtotal: number) {
  if (isEbookEligibleSubtotal(subtotal)) {
    return "Poklon: Besplatan ODALIS eBook";
  }

  const remaining = new Intl.NumberFormat("sr-RS", {
    maximumFractionDigits: 0,
  }).format(EBOOK_MINIMUM_SUBTOTAL_RSD - subtotal);
  return `Dodajte još ${remaining} RSD za besplatan ODALIS eBook`;
}
