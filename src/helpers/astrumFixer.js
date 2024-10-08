import { astrumCategoryReplacements } from '@/helpers/constants'

export function processAstrumStock(productsRaw) {
  const blankRowRemoved = productsRaw.slice(0, productsRaw.length - 1)
  const wantedRows = removeUnwantedRows(blankRowRemoved)
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
      sku: product['Part Number'],
      name: product.title,
      stock: 5,
      images: product.image_link,
      normal_cost: product.SRP,
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
      sale_price: product.normal_cost
    }
  })
}
