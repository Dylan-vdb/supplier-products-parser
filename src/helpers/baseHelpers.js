export function calculateFullPrice({ price, margin, vat }) {
  const marginPercentage = margin / 100
  const vatPercentage = vat / 100

  const recommendedPrice = price / (1 - marginPercentage)
  const priceWithVat = Math.round(recommendedPrice * (1 + vatPercentage))

  return priceWithVat
}

export function saveSkuList(products, supplier) {
  const skuList = products.map((product) => product.sku)
  const existingListString = localStorage.getItem(`${supplier}SkuListNew`)
  if (existingListString) {
    let existingSkus = JSON.parse(existingListString)
    let discontinuedSkus = existingSkus.filter((sku) => !skuList.includes(sku))
    discontinuedSkus.forEach((sku) => {
      products.push({
        sku: sku,
        published: 0
      })
    })
    localStorage.setItem(`${supplier}SkuListOld`, existingListString)
  }
  localStorage.setItem(`${supplier}SkuListNew`, JSON.stringify(skuList))
  return products
}
