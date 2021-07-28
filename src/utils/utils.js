export const moneyFormatter = (amount = 0, {
  localeTag = 'pl',
  currency = 'PLN',
  minimumFractionDigits = 2,
} = {}) => {
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits,
  };
  const formatter = Intl.NumberFormat(localeTag, options);
  return formatter.format(amount);
};

export const sumCart = (cart) => cart.reduce((acc, el) => acc + Number(el.price), 0);
