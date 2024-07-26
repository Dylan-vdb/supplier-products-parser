import { calculateFullPrice, saveSkuList } from '../helpers/baseHelpers'
import { syntechCategoryReplacements, syntechUnwantedSubstrings } from '../helpers/constants'

export function processSyntechStock(xmlData) {
  const products = xmlData.syntechstock.stock.product
  const promotedProductsHandled = handlePromotedProducts(products)
  const allPipedCategoriesHandled = removeOtherPipes(promotedProductsHandled)
  const cleanedProducts = removeDuplicates(allPipedCategoriesHandled)
  const filteredProducts = removeUnwantedCategories(cleanedProducts)
  const fixedImages = fixAllImagesField(filteredProducts)
  const fixedPipedNames = fixPipedNames(fixedImages)
  const categorizedProducts = improveCategoryNames(fixedPipedNames)
  const combinedStocks = combineStocksField(categorizedProducts)
  const tidiedFields = tidyFields(combinedStocks)
  const finalProducts = saveSkuList(tidiedFields, 'syntech')
  return finalProducts
}

function fixPipedNames(products) {
  // Some of the names have pipes (ie |) in them with no spaces between them, this messes with the ui. TODO make sure that pipes directly between two words instead has a space between the pipe and each of the words.
  return products.map((product) => {
    const name = product.name.replace(/(\w)\|(\w)/g, '$1 | $2')
    return { ...product, name }
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
          tags: 'On Promotion',
          sale_price: calculateFullPrice({
            price: Number(product.promo_price),
            margin: Number(product.recommended_margin),
            vat: 15
          }),
          price: product.rrp_incl
        }
      : { ...product, price: product.rrp_incl, sale_price: null }
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
      rrp_incl,
      sale_price,
      promo_price: promo_cost,
      promo_starts,
      promo_ends,
      price: normal_cost,
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
      attributes
    }) => ({
      sku,
      name,
      price,
      rrp_incl,
      sale_price,
      promo_cost,
      promo_starts,
      promo_ends,
      normal_cost,
      categories,
      tags,
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
  const replacements = syntechCategoryReplacements

  return products.map((product) => {
    let updatedCategoryTree = product.categorytree

    replacements.forEach(([find, replace]) => {
      updatedCategoryTree = updatedCategoryTree.replace(find, replace)
    })

    return { ...product, categorytree: updatedCategoryTree }
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
    .map((product) => {
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
