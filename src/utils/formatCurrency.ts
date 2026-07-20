const INR_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const INR_COMPACT_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined || amount === null) return "₹0.00";
  return INR_FORMATTER.format(amount);
}

export function formatCurrencyCompact(amount: number | undefined): string {
  if (amount === undefined || amount === null) return "₹0";
  return INR_COMPACT_FORMATTER.format(amount);
}
