export const formatNumber = (n) => new Intl.NumberFormat().format(n ?? 0);
export const formatPercent = (n) => `${(n ?? 0).toFixed(2)}%`;
