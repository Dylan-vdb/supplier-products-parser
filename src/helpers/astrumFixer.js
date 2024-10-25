import { astrumCategoryReplacements } from '@/helpers/constants'
import { calculateFullPrice } from '@/helpers/baseHelpers'

export function processAstrumStock(productsRaw) {
  const tablesJoined = combineTables(productsRaw)
  const pricing = setPricing(tablesJoined)
  const improvedCategoryNames = improveCategoryNames(pricing)
  return improvedCategoryNames
}

function combineTables(productsTables) {
  const stockTable = productsTables.find((table) => table.name.includes('SAR')).result.data
  const detailsTable = productsTables.find((table) => table.name.includes('UPLOAD')).result.data
  const joinedTable = detailsTable
    .map((product) => {
      const details = stockTable.find((detail) => detail['ITEM NUMBER'] === product['Part Number'])
      return { ...product, ...details }
    })
    .filter((product) => product.id)
  const issueProduct = joinedTable.find((product) => product['Part Number'] === 'A33401-B')
  debugger
  return joinedTable
}

function setPricing(products) {
  let aboveCount = 0
  return products
    .map(
      ({
        AVAIL: stock,
        COST: normal_cost,
        title: name,
        'Part Number': sku,
        SRP,
        categories,
        description,
        image_link: images
      }) => {
        return {
          stock,
          SRP,
          normal_cost,
          name,
          sku: 'AST-' + sku,
          categories,
          description,
          images,
          brand: 'Astrum'
        }
      }
    )
    .map((product) => {
      const recommended_retail = parseInt(product.SRP)
      const sale_price = calculateFullPrice({
        price: Number(product.normal_cost),
        margin: 25,
        vat: 15
      })
      if (sale_price > recommended_retail) {
        aboveCount++
        console.log('count: ', aboveCount)
        return {
          sale_price: null,
          price: recommended_retail,
          ...product
        }
      } else {
        return {
          sale_price,
          recommended_retail,
          price: recommended_retail,
          ...product
        }
      }
    })
}

function improveCategoryNames(products) {
  const productsWithEmptyCategories = products.filter((product) => product.categories === '')
  const issueProduct = products.find((product) => product.sku === 'AST-A33401-B')
  debugger
  const replacements = astrumCategoryReplacements
  return products.map((product) => {
    let updatedCategoryTree = product.categories
    replacements.forEach(([find, replace]) => {
      updatedCategoryTree = updatedCategoryTree.replace(find, replace)
    })

    return { ...product, categories: updatedCategoryTree }
  })
}
