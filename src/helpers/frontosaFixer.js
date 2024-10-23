import frontosaCategories from '@/helpers/frontosaCategories.json'
import frontosaStock from '@/helpers/frontosaStock.json'
import { calculateFullPrice } from '@/helpers/baseHelpers'
import frontosaImages from './image_filenames.json'
import { frontosaCategoryReplacements } from './constants'

export function processFrontosaStock(rawData) {
  const initialProducts = gatherInitialProducts(rawData)
  const emptyDescriptionsRemoved = removeEmptyDescriptions(initialProducts)
  const categorizedProducts = improveCategoryNames(emptyDescriptionsRemoved)
  const faultyCategorySymbolsRemoved = removeCategorySymbolFaults(categorizedProducts)
  const prependedProductCodes = prependProductCodes(faultyCategorySymbolsRemoved)
  const products = prependedProductCodes
  return products
}

function gatherInitialProducts(rawData) {
  const imagesPerCode = imageLinksPerCode(frontosaImages)

  const mainProducts = fetchFrontosaData()
  const products = mainProducts
    .map((product) => {
      const otherRow = rawData.find((item) => item.CODE === product.code)
      return { ...product, ...otherRow }
    })
    .map(
      ({
        code,
        desc,
        qty_cpt,
        qty_dbn,
        qty_els,
        qty_jhb,
        more_cpt,
        more_dbn,
        more_els,
        more_jhb,
        price,
        DESCRIPTION,
        category,
        brand
      }) => {
        return {
          sku: code,
          name: desc,
          stock: qty_cpt + qty_dbn + qty_els + qty_jhb + more_cpt + more_dbn + more_els + more_jhb,
          normal_cost: price,
          description: DESCRIPTION,
          category,
          brand,
          price: calculateFullPrice({
            price: price,
            margin: 17,
            vat: 15
          }),
          images: imagesPerCode[code]?.join(',') || null
        }
      }
    )
    .filter((product) => {
      return product.images
    })

  return products
}

function imageLinksPerCode(imageNames) {
  const result = imageNames.reduce((acc, image) => {
    const imageUrl = `https://ik.imagekit.io/ajwhrydzs/FlattenedImages/${image.replaceAll(' ', '%20')}`
    const [, productCode] = image.split('__')
    if (!acc[productCode]) {
      acc[productCode] = []
    }

    acc[productCode].push(imageUrl)

    return acc
  }, {})

  return result
}

function fetchFrontosaData() {
  const categories = frontosaCategories.categories
  const brands = frontosaCategories.brands
  const stock = frontosaStock.items

  return stock
    .filter((product) => {
      return product.pid !== 0
    })
    .map((product) => {
      const result = {
        ...product,
        category: categories.filter((category) => {
          return category.id === product.pid
        })[0]?.name,
        brand:
          brands.find((brand) => {
            return brand.id === product.bid
          })?.name || null
      }
      return result
    })
    .sort((a, b) => {
      const categoryNameA = a.category.toUpperCase()
      const categoryNameB = b.category.toUpperCase()

      if (categoryNameA < categoryNameB) {
        return -1
      }
      if (categoryNameA > categoryNameB) {
        return 1
      }

      return 0
    })
}

function improveCategoryNames(products) {
  const replacements = frontosaCategoryReplacements

  return products.map((product) => {
    let updatedCategoryTree = product.category

    replacements.forEach(([find, replace]) => {
      updatedCategoryTree = updatedCategoryTree.replace(find, replace)
    })

    return { ...product, category: updatedCategoryTree }
  })
}

function removeEmptyDescriptions(products) {
  return products.filter((product) => product.description)
}

function removeCategorySymbolFaults(products) {
  return products.map((product) => {
    const cleanedName = product.name.replace(/^!!/, '').replace(/^!/, '').replace(/^\*/, '')
    return { ...product, name: cleanedName }
  })
}

function prependProductCodes(products) {
  return products.map((product) => {
    return {
      ...product,
      sku: 'FTSA-' + product.sku
    }
  })
}
