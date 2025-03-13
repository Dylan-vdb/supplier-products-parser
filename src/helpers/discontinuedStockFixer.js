export function processDiscontinuedStock(products) {
  const wpSkus = products.map((product) => product.SKU)

  const syntechSkuListNew = getSkuListNew('syntechSkuListNew')
  const frontosaSkuListNew = getSkuListNew('frontosaSkuListNew')
  const astrumSkuListNew = getSkuListNew('astrumSkuListNew')
  const micropointSkuListNew = getSkuListNew('micropointSkuListNew')
  const esquireSkuListNew = getSkuListNew('esquireSkuListNew')

  const hardwareSkuListNew = getSkuListNew('hardwareSkuListNew')
  const stationerySkuListNew = getSkuListNew('stationerySkuListNew')
  const lifestyleSkuListNew = getSkuListNew('lifestyleSkuListNew')

  const activeSkus = [
    ...syntechSkuListNew,
    ...frontosaSkuListNew,
    ...astrumSkuListNew,
    ...micropointSkuListNew,
    ...esquireSkuListNew,
    ...hardwareSkuListNew,
    ...stationerySkuListNew,
    ...lifestyleSkuListNew
  ]

  const discontinuedSkus = wpSkus.filter((sku) => !activeSkus.includes(sku))
  const discontinuedProducts = products.filter((product) => discontinuedSkus.includes(product.SKU))

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

const getSkuListNew = (skuListName) => {
  return JSON.parse(localStorage.getItem(skuListName)) || []
}
