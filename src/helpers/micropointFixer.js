import { calculateFullPrice, saveSkuList } from '@/helpers/baseHelpers'
import {
  micropointUnwantedSubstrings,
  micropointAcronyms,
  micropointCategoryReplacements
} from '@/helpers/constants'

export function processMicropointStock(xmlData) {
  const products = xmlData.xml_data.items.item
  const wantedFields = removeUnwantedFields(products)
  const combinedCategories = combineCategoriesField(wantedFields)
  const categoriesRemoved = removeUnwantedCategories(combinedCategories)
  const duplicatesRemoved = removeDuplicates(categoriesRemoved)
  const promotedProductsHandled = handlePromotedProducts(duplicatesRemoved)
  const newCategoriesIncluded = includeNewCategories(promotedProductsHandled)
  const improvedCategoryNames = improveCategoryNames(newCategoriesIncluded)
  const improvedCategoryCapitalization = improveCategoryCapitalization(improvedCategoryNames)
  const commonFieldMapping = mapToCommonFields(improvedCategoryCapitalization)
  const leaflessCategoryTrees = removeLeaflessCategoryTrees(commonFieldMapping)
  const notebooksSpecialPrice = giveNotebooksSpecialPrice(leaflessCategoryTrees)
  const cablesSpecialPrice = giveCablesSpecialPrice(notebooksSpecialPrice)
  const fixedSquashedTitles = fixSquashedTitles(cablesSpecialPrice)
  const finalProducts = saveSkuList(fixedSquashedTitles, 'micropoint')

  return finalProducts
}

function fixCommaSquashing(title) {
  return title.replace(/([a-zA-Z0-9]),([a-zA-Z0-9])/g, '$1, $2')
}

function fixSquashedTitles(products) {
  return products.map((product) => {
    return {
      ...product,
      name: fixCommaSquashing(product.name)
    }
  })
}

function giveNotebooksSpecialPrice(products) {
  return products.map((product) =>
    product.categories === 'Notebooks'
      ? {
          ...product,
          price: calculateFullPrice({
            price: Number(product.normal_cost),
            margin: 10,
            vat: 15
          })
        }
      : product
  )
}

function removeUnwantedFields(products) {
  return products.map((product) => {
    // Older csv data has product.image_url. Newer csv data has product.images.image.image_url or product.images.image as array of objects.
    const images = product.image_url
      ? product.image_url
      : Array.isArray(product.images.image)
        ? product.images.image.reduce((acc, image) => {
            return acc === '' ? image.image_url : acc + ',' + image.image_url
          }, '')
        : product.images.image.image_url

    return {
      sku: product.item_number,
      name: product.short_description,
      normal_cost: product.price,
      sale_price: null, // default until calculated in handlePromotedProducts
      price: calculateFullPrice({
        price: Number(product.price),
        margin: 17,
        vat: 15
      }),
      recommended_retail: product.recommendedRetail,
      promo_cost: product.specialPrice,
      promo_starts: product.specialStartDate,
      promo_ends: product.specialEndDate,
      stock: product.quantity,
      images,
      description: product.detailed_description,
      category_description: product.category_description,
      group_description: product.group_description,
      tags: '',
      brand: product.brand
    }
  })
}

function combineCategoriesField(products) {
  // Merge the two columns into one with the same '>' separator as syntech stock.
  return products.map((product) => {
    const combinedCategories = `${product.category_description} > ${product.group_description}`
    return { ...product, categories: combinedCategories }
  })
}

function removeLeaflessCategoryTrees(products) {
  return products.filter((product) => {
    return (
      product.categories !== 'Gadgets >' &&
      product.categories !== 'Gaming >' &&
      product.categories !== 'HDMI Products >' &&
      product.categories !== 'Components > Graphics Cards >' &&
      product.categories !== 'Peripherals > Cables >'
    )
  })
}

function mapToCommonFields(products) {
  return products.map(
    ({
      sku,
      name,
      normal_cost,
      sale_price,
      price,
      tags,
      promo_cost,
      recommended_retail,
      promo_starts,
      promo_ends,
      stock,
      images,
      description,
      categories,
      brand,
      is_featured
    }) => {
      return {
        sku,
        name,
        normal_cost,
        sale_price,
        price,
        recommended_retail,
        tags,
        promo_cost,
        date_sale_price_starts: promo_starts,
        date_sale_price_ends: promo_ends,
        stock,
        images,
        description,
        categories,
        weight: null,
        length: null,
        width: null,
        height: null,
        brand,
        type: 'simple',
        published: 1,
        'Visibility in catalog': 'visible',
        is_featured
      }
    }
  )
}

function improveCategoryCapitalization(products) {
  const acronyms = micropointAcronyms

  return products.reduce((updatedProducts, product) => {
    const updatedCategoryTree = product.categories
      .replace(/([^\s-]+)(?:\s+|$)/g, (match, word) => {
        if (acronyms.has(word.toUpperCase())) {
          return word.toUpperCase() + ' '
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + ' '
        }
      })
      .replace(/ $/, '')

    updatedProducts.push({ ...product, categories: updatedCategoryTree })
    return updatedProducts
  }, [])
}

function handlePromotedProducts(products) {
  return products.map((product) => {
    const promotionEndDate = new Date(product.promo_ends)
    const isPromoted =
      product.promo_cost > 0 &&
      product.promo_cost < product.normal_cost &&
      promotionEndDate > new Date()

    return isPromoted
      ? {
          ...product,
          tags: 'On Sale',
          sale_price: calculateFullPrice({
            price: Number(product.promo_cost),
            margin: 17,
            vat: 15
          }),
          is_featured: 1
        }
      : { ...product, tags: '', sale_price: null, is_featured: 0 }
  })
}

function removeUnwantedCategories(products) {
  const unwantedSubstrings = micropointUnwantedSubstrings

  let preFiltered = products
    .filter((product) => {
      const emptyOfSubcategories =
        (product.category_description == 'SOUND' && product.group_description == '') ||
        (product.category_description == 'MOUSE' && product.group_description == '')
      const brokenImageLink = product.images.endsWith('.jfif')

      return !emptyOfSubcategories && !brokenImageLink
    })
    .filter((product) => {
      return product.images.length > 0
    })
  const filteredArray = preFiltered?.filter((product) => {
    const categories = product.categories
    return !unwantedSubstrings.some((substring) => {
      const result = categories.includes(substring)
      return result
    })
  })

  return filteredArray
}

function includeNewCategories(products) {
  const watchCategories = []
  const result = products.reduce((acc, product) => {
    const updatedProduct = { ...product }

    if (
      product.categories.includes('BATTERIES > BATTERIES') ||
      product.categories.includes('BATTERIES > AAA BATTERIES') ||
      product.categories.includes('BATTERIES > AA BATTERIES') ||
      product.categories.includes('BATTERIES > ACCESSORIES')
    ) {
      updatedProduct.categories = 'Power Solutions > Batteries'
    }

    if (product.categories.includes('BATTERIES > INVERTER')) {
      updatedProduct.categories = 'Power Solutions > Inverters'
    }

    if (product.categories.includes('CARTRIDGES > INK CARTRIDGES')) {
      updatedProduct.categories = 'Printers > Cartridges > Ink Cartridges'
    }

    if (product.categories.includes('CARTRIDGES > ACCESSORIES')) {
      return acc
    }

    if (product.categories.includes('CASES > GAMING')) {
      updatedProduct.categories = 'Desktop Components > PC Cases > Gaming PC Cases'
    }

    if (product.categories.includes('CASES > MINING')) {
      return acc
    }

    if (
      product.categories.includes('CASES >') &&
      product.categories.toLowerCase().includes('atx')
    ) {
      updatedProduct.categories = 'Desktop Components > PC Cases > Office PC Cases'
    }

    if (product.categories === 'CONSUMABLES > ') {
      updatedProduct.categories = 'Peripherals > Consumables'
    }

    if (product.categories.includes('CONSUMABLES > ACCESSORIES')) {
      updatedProduct.categories = 'Peripherals > Consumables'
    }

    if (product.categories.includes(`CONSUMABLES > CD'S AND DVD'S`)) {
      updatedProduct.categories = `Storage Media > CD's and DVD's`
    }

    if (product.categories.includes(`CONSUMABLES > HDMI`)) {
      updatedProduct.categories = `Connectors Adaptors & Converters`
    }

    if (product.categories.includes(`DESKTOP MACHINE >`)) {
      updatedProduct.categories = `Desktop Computers > Office Desktops`
    }

    if (product.categories.includes(`EXTENDERS >`)) {
      updatedProduct.categories = `Networking > Network Extenders`
    }

    if (product.categories.includes(`EXTERNAL ENCLOSURES >`)) {
      updatedProduct.categories = `Storage Media > Enclosures`
    }

    if (product.categories.includes(`FANS >`)) {
      updatedProduct.categories = `Desktop Components > Cooling > Fans`
    }

    if (product.categories.includes(`HEALTHCARE >`)) {
      updatedProduct.categories = `Gadgets > Healthcare`
    }

    if (product.categories.includes(`KVM SWITCHES >`)) {
      updatedProduct.categories = `Networking > KVM Switches`
    }

    if (product.categories.includes(`LAN PRODUCTS >`)) {
      updatedProduct.categories = `Connectors Adaptors & Converters`
    }

    if (product.categories.includes(`MULTIPLUGS >`)) {
      updatedProduct.categories = `Power Solutions > Multiplugs`
    }

    if (product.categories.includes(`NETWORKING > KVM SWITCHES`)) {
      updatedProduct.categories = `Networking > KVM Switches`
    }

    if (product.categories.includes(`POINT OF SALE >`)) {
      updatedProduct.categories = `Peripherals > Point of Sale`
    }

    if (product.categories.includes(`POWER SUPPLY >`)) {
      if (product.categories.includes(`POWER SUPPLY > GAMING`)) {
        updatedProduct.categories = `Power Solutions > Computer Power Supplies > Gaming,Gaming > Power Supplies`
      }

      if (product.categories.includes(`POWER SUPPLY > MINING`)) {
        return acc
      }

      if (product.categories.includes(`WATT PSU`)) {
        updatedProduct.categories = `Power Solutions > Computer Power Supplies > Non-Modular Power Supplies`
      }
    }

    if (product.categories.includes(`PROCESSORS > THERMAL PASTE`)) {
      updatedProduct.categories = `Peripherals > Consumables`
    }

    if (product.categories.includes(`PROJECTORS >`)) {
      updatedProduct.categories = `Gadgets > Media & Streaming > Projectors`
    }

    if (product.categories.includes(`ROUTERS >`)) {
      updatedProduct.categories = `Networking > Routers & Mesh`
    }

    if (product.categories.includes(`SLEEVE >`)) {
      updatedProduct.categories = `Bags Cases & Covers > Sleeves`
    }

    if (product.categories.includes(`SOLID STATE DRIVE >`)) {
      if (product.categories.includes(`2.5" SSD`)) {
        updatedProduct.categories = `Storage Media > Solid State Drives`
      }
      if (product.categories.includes(`EXTERNAL 2.5"`)) {
        updatedProduct.categories = `Storage Media > External SSDs`
      }
      if (product.categories.includes(`SOLID STATE DRIVE > GAMING`)) {
        updatedProduct.categories = `Gaming > Solid State Drives`
      }
      if (product.categories.includes(`SOLID STATE DRIVE > ACCESSORIES`)) {
        return acc
      }
    }

    if (product.categories.includes(`MEMORY > MEMORY`)) {
      watchCategories.push(product)
      updatedProduct.categories = `Gaming > Mouses`
    }

    acc.push(updatedProduct)
    return acc
  }, [])

  return result
}

function improveCategoryNames(products) {
  const replacements = micropointCategoryReplacements

  return products.map((product) => {
    let updatedCategoryTree = product.categories
    replacements.forEach(([find, replace]) => {
      updatedCategoryTree = updatedCategoryTree.replace(find, replace)
    })

    return { ...product, categories: updatedCategoryTree }
  })
}

function removeDuplicates(products) {
  const sortedArray = [...products].sort((a, b) => {
    const skuA = a.sku
    const skuB = b.sku
    if (skuA < skuB) {
      return -1
    }
    if (skuA > skuB) {
      return 1
    }
    return 0
  })

  const uniqueObjects = sortedArray.reduce((unique, obj) => {
    if (!unique.some((o) => o.sku === obj.sku)) {
      unique.push(obj)
    }
    return unique
  }, [])

  return uniqueObjects
}

function giveCablesSpecialPrice(products) {
  const result = products.map((product) => {
    if (product.categories.includes('Peripherals > Cables')) {
      const newFullPrice = calculateFullPrice({
        price: product.normal_cost,
        margin: 35,
        vat: 15
      })
      const newSalePrice = product.sale_price
        ? calculateFullPrice({
            price: product.promo_cost,
            margin: 35,
            vat: 15
          })
        : null

      return { ...product, price: newFullPrice, sale_price: newSalePrice }
    } else {
      return product
    }
  })
  return result
}
