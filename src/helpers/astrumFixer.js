import { astrumCategoryReplacements } from '@/helpers/constants'
import { calculateFullPrice, saveSkuList } from '@/helpers/baseHelpers'

export function processAstrumStock(productsRaw) {
  const tablesJoined = combineTables(productsRaw)
  const pricing = setPricing(tablesJoined)
  const prefixedTonerTitles = prefixTonerTitles(pricing)
  const prefixedChargerTitles = prefixChargerTitles(prefixedTonerTitles)
  const prefixedBatteryTitles = prefixBatteryTitles(prefixedChargerTitles)
  const improvedCategoryNames = improveCategoryNames(prefixedBatteryTitles)
  const products = saveSkuList(improvedCategoryNames, 'astrum')

  return products
}

function prefixTonerTitles(products) {
  const result = products.map((product) => {
    return {
      ...product,
      name: product.categories.includes('Toner ') ? 'ASTRUM GENERIC ' + product.name : product.name
    }
  })
  return result
}

function prefixChargerTitles(products) {
  const result = products.map((product) => {
    return {
      ...product,
      name: product.categories.includes('Laptop Charger')
        ? 'ASTRUM GENERIC ' + product.name
        : product.name
    }
  })
  return result
}

function prefixBatteryTitles(products) {
  const result = products.map((product) => {
    return {
      ...product,
      name: product.categories.includes(' Batteries')
        ? 'ASTRUM GENERIC ' + product.name
        : product.name
    }
  })
  return result
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
          brand: 'Astrum',
          'Visibility in catalog': 'visible',
          published: 1,
          is_featured: 0,
          tags: 'On Sale'
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
    .filter((product) => !product?.stock?.includes('N/A'))
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
