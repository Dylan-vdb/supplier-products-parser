export function calculateFullPrice(price, margin, vat) {
  // debugger
  const marginPercentage = margin / 100
  const vatPercentage = vat / 100

  const recommendedPrice = price / (1 - marginPercentage)
  const priceWithVat = Math.round(recommendedPrice * (1 + vatPercentage))

  return priceWithVat
}
