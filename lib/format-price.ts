const serbianNumberFormatter = new Intl.NumberFormat("sr-RS", {
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number) {
  return `${serbianNumberFormatter.format(amount)} RSD`;
}
