export function calculateFullPrice({ price, margin, vat }) {
  const marginPercentage = margin / 100
  const vatPercentage = vat / 100

  const priceWithVat = Math.round(price * (1 + marginPercentage) * (1 + vatPercentage))
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
        stock: 0,
        published: 0,
        'Visibility in catalog': 'hidden'
      })
    })
    localStorage.setItem(`${supplier}SkuListOld`, existingListString)
  }
  localStorage.setItem(`${supplier}SkuListNew`, JSON.stringify(skuList))
  return products
}
