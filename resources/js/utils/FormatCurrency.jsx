export const FormatCurrency = (quantity, currency = 'COP', locale = 'es-CO') => {
  return new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: currency,
  }).format(quantity);
}
