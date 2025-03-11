import { calculateFullPrice, saveSkuList } from '../helpers/baseHelpers'
import { syntechCategoryReplacements, syntechUnwantedSubstrings } from './constants'

export function processSyntechStock(xmlData) {
  const products = xmlData.syntechstock.stock.product
  const withNormalCost = addNormalCost(products)
  const promotedProductsHandled = handlePromotedProducts(withNormalCost)
  const allPipedCategoriesHandled = removeOtherPipes(promotedProductsHandled)
  const cleanedProducts = removeDuplicates(allPipedCategoriesHandled)
  const filteredProducts = removeUnwantedCategories(cleanedProducts)
  const fixedImages = fixAllImagesField(filteredProducts)
  const fixedPipedNames = fixPipedNames(fixedImages)
  const newCategoriesIncluded = includeNewCategories(fixedPipedNames)
  const categorizedProducts = improveCategoryNames(newCategoriesIncluded)
  const combinedStocks = combineStocksField(categorizedProducts)
  const tidiedFields = tidyFields(combinedStocks)
  const finalProducts = saveSkuList(tidiedFields, 'syntech')
  return finalProducts
}

function includeNewCategories(products) {
  let watchCategories = []
  const result = products.map((product) => {
    let newCategory = product.categorytree
    if (product.categorytree.includes(' > Mounts and Brackets')) {
      newCategory = 'Peripherals > Mounting Kits'
    }

    if (product.categorytree.includes(' > Screen Protectors')) {
      newCategory = 'Peripherals > Screen Protectors'
    }

    if (product.categorytree.includes('Cables > Display Cables')) {
      newCategory = 'Cables > Display Cables'
    }

    if (product.categorytree.includes('Cables > USB Cables')) {
      newCategory = 'Cables > USB Cables'
    }

    if (product.categorytree.includes('> Tools')) {
      newCategory = 'Tools'
    }

    if (product.categorytree.includes('Smart Security > IP Cameras')) {
      newCategory = 'Gadgets > Smart Security > IP Cameras'
    }

    if (product.categorytree.includes('Smart Security > Controllers and Sensors')) {
      newCategory = 'Gadgets > Smart Security > Controllers and Sensors'
    }

    if (product.categorytree.includes('Scooters and Bikes >')) {
      newCategory = 'Gadgets > Scooters and Bikes'
    }

    if (product.categorytree.includes(' > Wearables > Accessories')) {
      newCategory = 'Gadgets > Wearables'
    }

    if (product.categorytree.includes(' > Lifestyle Accessories')) {
      if (product.name.toLowerCase().includes('writing tablet')) {
        newCategory = 'Gadgets > Writing Tablets'
      }
      watchCategories.push(product)
      newCategory = 'Gadgets'
    }

    return {
      ...product,
      categorytree: newCategory
    }
  })

  return result
}

function addNormalCost(products) {
  return products.map((product) => {
    return {
      ...product,
      normal_cost: product.price
    }
  })
}

function handlePromotedProducts(products) {
  return products.map((product) => {
    const promotionEndDate = new Date(product.promo_ends)
    const isPromoted =
      product.categorytreealt?.includes('|On Promotion') && promotionEndDate > new Date()

    return isPromoted
      ? {
          ...product,
          categorytreealt: product.categorytreealt.replace('|On Promotion', ''),
          tags: 'On Sale',
          is_featured: 1,
          sale_price: calculateFullPrice({
            price: Number(product.promo_price),
            margin: 18,
            vat: 15
          }),
          price: calculateFullPrice({
            price: Number(product.normal_cost),
            margin: 25,
            vat: 15
          })
        }
      : {
          ...product,
          price: calculateFullPrice({
            price: Number(product.normal_cost),
            margin: 18,
            vat: 15
          }),
          sale_price: null,
          is_featured: 0
        }
  })
}

function removeOtherPipes(products) {
  return products.map((product) => {
    product.categorytreealt = product.categorytreealt?.split('|')[0]

    return product
  })
}

function tidyFields(products) {
  return products.map(
    ({
      sku,
      name,
      price,
      normal_cost,
      rrp_incl,
      sale_price,
      promo_price: promo_cost,
      promo_starts,
      promo_ends,
      recommended_margin,
      cptstock,
      jhbstock,
      stock,
      weight,
      length,
      width,
      height,
      all_images: images,
      categorytree: categories,
      tags,
      description,
      attributes,
      is_featured
    }) => ({
      sku,
      name,
      price,
      rrp_incl,
      sale_price,
      promo_cost,
      date_sale_price_starts: promo_starts,
      date_sale_price_ends: promo_ends,
      normal_cost,
      categories,
      tags,
      is_featured,
      description,
      recommended_margin,
      weight,
      length,
      width,
      height,
      images,
      cptstock,
      jhbstock,
      stock,
      brand: attributes.brand,
      type: 'simple',
      'Visibility in catalog': 'visible',
      published: 1
    })
  )
}

function combineStocksField(products) {
  return products.map((obj) => {
    const stock = Number(obj.cptstock) + Number(obj.jhbstock)

    return { ...obj, stock }
  })
}

function improveCategoryNames(products) {
  // AT-ECAB-BK300-C2P3-BK/R
  const replacements = syntechCategoryReplacements

  return products.map((product) => {
    let updatedCategoryTree = product.categorytree

    replacements.forEach(([find, replace]) => {
      updatedCategoryTree = updatedCategoryTree.replace(find, replace)
    })

    return { ...product, categorytree: updatedCategoryTree }
  })
}

function fixPipedNames(products) {
  // Some of the names have pipes (ie |) in them with no spaces between them, this messes with the ui. TODO make sure that pipes directly between two words instead has a space between the pipe and each of the words.
  return products.map((product) => {
    const name = product.name.replace(/(\w)\|(\w)/g, '$1 | $2')
    return { ...product, name }
  })
}

function fixAllImagesField(products) {
  return products.map((product) => {
    const updatedAllImages = product.all_images?.replace(/ \|\s*/g, ',')
    return { ...product, all_images: updatedAllImages }
  })
}

function removeUnwantedCategories(arr) {
  const unwantedSubstrings = syntechUnwantedSubstrings

  const filteredArray = arr
    .filter((product) => {
      if (product.categories) {
        const categories = product.categorytree.toUpperCase()
        return !unwantedSubstrings.some((substring) => categories.includes(substring.toUpperCase()))
      } else {
        return false
      }
    })
    // Recently included categories
    .map((product) => {
      if (product.categorytree.includes('Just Arrived')) {
        product.tags = product.tags ? product.tags + ',Just Arrived' : 'Just Arrived'
      }
      product.categorytree = product.categorytree?.split('|')[0]
      return product
    })
    // For the case when the only category information is 'On Promotion'
    .filter((product) => !product.categorytree?.includes('On Promotion'))

  return filteredArray
}

function removeDuplicates(arr) {
  const sortedArray = [...arr].sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })

  const uniqueObjects = sortedArray.reduce((unique, obj) => {
    if (!unique.some((o) => o.name === obj.name)) {
      unique.push(obj)
    }
    return unique
  }, [])

  return uniqueObjects
}
