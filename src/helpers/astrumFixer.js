import { astrumCategoryReplacements } from '@/helpers/constants'
import { calculateFullPrice } from '@/helpers/baseHelpers'

export function processAstrumStock(productsRaw) {
  // const blankRowRemoved = productsRaw.slice(0, productsRaw.length - 1)
  const wantedRows = removeUnwantedRows(productsRaw)
  const fixedFieldNames = fixFieldNames(wantedRows)
  const improvedCategoryNames = improveCategoryNames(fixedFieldNames)
  const addedPricing = addPricing(improvedCategoryNames)
  debugger
}

function removeUnwantedRows(products) {
  return products.filter(
    (product) => product.Stock !== 'out of stock' && product.image_link !== '' && product.SRP !== ''
  )
}

const fixFieldNames = (products) => {
  return products.map((product) => {
    return {
      sku: 'AST-' + product['Part Number'],
      name: product.title,
      stock: product.Stock,
      images: product.image_link,
      normal_cost: parseInt(product.SRP),
      description: product.description,
      categories: product.categories
    }
  })
}

function improveCategoryNames(products) {
  const replacements = astrumCategoryReplacements
  return products.map((product) => {
    let updatedCategoryTree = product.categories
    replacements.forEach(([find, replace]) => {
      updatedCategoryTree = updatedCategoryTree.replace(find, replace)
    })

    return { ...product, categories: updatedCategoryTree }
  })
}

function addPricing(products) {
  return products.map((product) => {
    return {
      ...product,
      price: calculateFullPrice({
        price: product.normal_cost,
        margin: 17,
        vat: 15
      })
    }
  })
}
