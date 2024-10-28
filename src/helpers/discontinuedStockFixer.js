export function processDiscontinuedStock(products) {
  const wpSkus = products.map((product) => product.SKU)

  const syntechSkuListNew = getSyntechSkuListNew('syntechSkuListNew')
  const frontosaSkuListNew = getSyntechSkuListNew('frontosaSkuListNew')
  const astrumSkuListNew = getSyntechSkuListNew('astrumSkuListNew')
  const micropointSkuListNew = getSyntechSkuListNew('micropointSkuListNew')

  const activeSkus = [
    ...syntechSkuListNew,
    ...frontosaSkuListNew,
    ...astrumSkuListNew,
    ...micropointSkuListNew
  ]

  const discontinuedSkus = wpSkus.filter((sku) => !activeSkus.includes(sku))
  const discontinuedProducts = products.filter((product) => discontinuedSkus.includes(product.SKU))
  const discontinuedProductsNoUncategorized = discontinuedProducts.filter(
    (product) => product.Categories !== 'Uncategorized'
  )

  const outputArray = discontinuedProducts.map((product) => {
    return {
      id: product.ID,
      sku: product.SKU,
      name: '',
      sale_price: null,
      price: null,
      tags: '',
      stock: 0,
      images: '',
      description: '',
      categories: '',
      published: 0,
      'Visibility in catalog': 'hidden'
    }
  })
  return outputArray
}

const getSyntechSkuListNew = (syntechSkuListNewString) => {
  return JSON.parse(localStorage.getItem(syntechSkuListNewString)) || []
}
