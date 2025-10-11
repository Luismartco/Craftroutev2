export const toIntAmount = (value) => {
  if (typeof value === 'number') return Math.round(value);
  if (typeof value === 'string') {
    const normalized = value.replace(/[^0-9.-]/g, '');
    const num = parseFloat(normalized);
    return Number.isNaN(num) ? 0 : Math.round(num);
  }
  if (value == null) return 0;
  const num = Number(value);
  return Number.isNaN(num) ? 0 : Math.round(num);
};


