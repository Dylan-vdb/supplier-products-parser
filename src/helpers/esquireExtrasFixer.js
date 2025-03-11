import { calculateFullPrice } from '../helpers/baseHelpers'

let topCategory
export function processEsquireExtras(xmlData, mainCategory) {
  topCategory = mainCategory
  const rawData = xmlData.ROOT.Products.Product
  const correctedFields = correctFields(rawData)
  const pricedProducts = priceProducts(correctedFields)
  const categorizedProducts = categorizeProducts(pricedProducts)
  const goodImages = categorizedProducts.filter(
    (product) => product.images.length > 0 && !product.images.includes('http://')
  )
  return goodImages
}

function correctFields(products) {
  const result = products.map(
    ({
      AvailableQty,
      Category,
      CategoryHead,
      HeightCM,
      LengthCM,
      WidthCM,
      MassKG,
      Price,
      ProductCode,
      ProductDescription,
      ProductName,
      image
    }) => {
      return {
        stock: AvailableQty,
        sku: String(ProductCode),
        normal_cost: Price,
        images: image,
        name: ProductName,
        description: ProductDescription,
        leafCategory: Category,
        headCategory: CategoryHead,
        height: HeightCM,
        length: LengthCM,
        width: WidthCM,
        weight: MassKG
      }
    }
  )
  return result
}

function priceProducts(products) {
  return products.map((product) => {
    return {
      ...product,
      price: calculateFullPrice({
        price: Number(product.normal_cost),
        margin: 17,
        vat: 15
      })
    }
  })
}

function categorizeProducts(products) {
  return products.map((product) => {
    return {
      ...product,
      categories: product.headCategory
        ? `${topCategory} > ${product.headCategory} > ${product.leafCategory}`
        : `${topCategory} > ${product.leafCategory}`
    }
  })
}
/**
stock
sku
normal_cost
images
name
description
categories
price
sale_price
tags
is_featured

 */
