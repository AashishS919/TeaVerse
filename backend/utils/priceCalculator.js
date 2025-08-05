export const calculateOfferPrice = ({ price, category, inStock }) => {
  let discount = 0;

  if (!inStock) return price; // no discount if out of stock

  switch (category.toLowerCase()) {
    case "green tea":
      discount = 0.10;
      break;
    case "matcha":
      discount = 0.15;
      break;
    case "black tea":
      discount = 0.05;
      break;
    default:
      discount = 0.08;
  }

  return Math.floor(price * (1 - discount));
};
