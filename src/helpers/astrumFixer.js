import { astrumCategoryReplacements } from '@/helpers/constants'
import { calculateFullPrice, saveSkuList, applyCategories } from '@/helpers/baseHelpers'
import { XMLParser } from 'fast-xml-parser'
import Papa from 'papaparse'

export async function processAstrumStock(files) {
  const productsRaw = await Promise.all(
    files.map((file) => {
      if (file.type == 'text/csv') {
        return parseCsv(file)
      } else {
        return parseXml(file)
      }
    })
  )

  const tablesJoined = combineTables(productsRaw)
  const pricing = setPricing(tablesJoined)
  const prefixedTonerTitles = prefixTonerTitles(pricing)
  const prefixedChargerTitles = prefixChargerTitles(prefixedTonerTitles)
  const prefixedBatteryTitles = prefixBatteryTitles(prefixedChargerTitles)
  const improvedCategoryNames = await applyCategories(prefixedBatteryTitles, 'Astrum')
  const finalProducts = saveSkuList(improvedCategoryNames, 'astrum')
  return finalProducts
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
  const detailsTable = productsTables.find((table) => table.name.includes('astrum_products')).result
    .products.product
  const joinedTable = stockTable
    .map((product) => {
      const details = detailsTable.find((detail) => {
        const sku = detail['sku_id'].split('_')[0]
        return product['ITEM NUMBER'] === sku
      })
      return { ...details, ...product }
    })
    .filter((product) => product.id)

  return joinedTable
}

function setPricing(products) {
  let aboveCount = 0
  return products
    .filter(
      (product) => product.AVAIL && product.COST && product['ITEM NUMBER'] && product.image_link
    )
    .map(
      ({
        AVAIL: stock,
        COST: normal_cost,
        title: name,
        'ITEM NUMBER': sku,
        categories,
        description,
        image_link: images,
        price: recommended_retail
      }) => {
        return {
          stock: Number(stock),
          normal_cost: Number(normal_cost),
          promo_cost: Number(normal_cost),
          recommended_retail: parseInt(recommended_retail),
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
      const recommended_retail = parseInt(product.recommended_retail)
      const sale_price = calculateFullPrice({
        price: product.normal_cost,
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

// function improveCategoryNames(products) {
//   const replacements = astrumCategoryReplacements
//   return products.map((product) => {
//     let updatedCategoryTree = product.categories
//     replacements.forEach(([find, replace]) => {
//       updatedCategoryTree = updatedCategoryTree.replace(find, replace)
//     })

//     return { ...product, categories: updatedCategoryTree, originalCategory: product.categories }
//   })
// }

function parseCsv(csvFile) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        resolve({ name: csvFile.name, result: results })
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}

function parseXml(xmlFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (event) => {
      const xmlRaw = event.target.result
      const parser = new XMLParser()
      const parsedXml = parser.parse(xmlRaw) // Uses the existing parsing logic

      if (parsedXml) {
        resolve({ name: xmlFile.name, result: parsedXml }) // Resolve the promise with the parsed object
      } else {
        reject(new Error('Failed to parse XML from file.')) // Reject on parsing error
      }
    }

    reader.onerror = (error) => {
      console.error('Error reading file:', error)
      reject(error) // Reject the promise on file read error
    }

    reader.readAsText(xmlFile)
  })
}
