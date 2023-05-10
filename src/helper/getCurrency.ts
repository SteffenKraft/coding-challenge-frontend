const getCurrency = (amount: number) =>
  amount.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });

export default getCurrency;
