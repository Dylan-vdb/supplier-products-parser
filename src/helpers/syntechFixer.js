import { calculateFullPrice } from '../helpers/baseHelpers'

export function processSyntechStock(xmlData) {
  const products = xmlData.syntechstock.stock.product
  const promotedProductsHandled = handlePromotedProducts(products)
  const allPipedCategoriesHandled = removeOtherPipes(promotedProductsHandled)
  const cleanedProducts = removeDuplicates(allPipedCategoriesHandled)
  const filteredProducts = removeUnwantedCategories(cleanedProducts)
  const fixedImages = fixAllImagesField(filteredProducts)
  const categorizedProducts = improveCategoryNames(fixedImages)
  const combinedStocks = combineStocksField(categorizedProducts)
  const tidiedFields = tidyFields(combinedStocks)
  const finalProducts = saveSkuList(tidiedFields)
  return finalProducts
}

function saveSkuList(products) {
  const skuList = products.map((product) => product.sku)
  const existingListString = localStorage.getItem('syntechSkuListNew')
  if (existingListString) {
    let existingSkus = JSON.parse(existingListString)
    let discontinuedSkus = existingSkus.filter((sku) => !skuList.includes(sku))
    discontinuedSkus.forEach((sku) => {
      products.push({
        sku: sku,
        published: 0
      })
    })
    localStorage.setItem('syntechSkuListOld', existingListString)
  }
  localStorage.setItem('syntechSkuListNew', JSON.stringify(skuList))
  return products
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
          sale_price: calculateFullPrice(
            Number(product.promo_price),
            Number(product.recommended_margin),
            15
          ),
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
      description
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
  return products.map((product) => {
    const updatedCategoryTree = product.categorytree

      .replace('Computers & Peripherals', 'Peripherals')
      .replace('Consumer Electronics > ', 'Accessories > ')
      .replace('Peripherals > Desktop Computers > Gaming Desktops', 'Computers > Gaming Desktops')
      .replace('Peripherals > Desktop Computers > Office Desktops', 'Computers > Office Desktops')
      .replace('Peripherals > Mini PCs > Barebone Systems', 'Mini PCs > Barebone Systems')
      .replace('Peripherals > Mini PCs > Complete Systems', 'Mini PCs > Complete Systems')
      .replace('Peripherals > Mousepads', 'Accessories > Mousepads')
      .replace('Peripherals > Stands and Cooling', 'Accessories > Stands and Cooling')
      .replace('Accessories > Bags and Covers', 'Accessories > Bags and Covers')
      .replace('Heating, Cooling, and Air Quality', 'Heating Cooling and Air Quality')
      .replace('Appliances > ', 'Gadgets > ')
      .replace(
        'Peripherals > Computer Audio > Headsets',
        'Peripherals > Computer Audio > Headsets > Over-Ears'
      )
      .replace('Accessories > Headphones > ', 'Peripherals > Computer Audio > Headsets > ')
      .replace('Accessories > Lighting', 'Gadgets > Lighting')
      .replace('Accessories > Portable Printing > Printers', 'Printers > Portable Printers')
      .replace(
        'Accessories > Portable Printing > Printing Consumables',
        'Printers > Portable Printers > Consumables'
      )
      .replace('Accessories > Speakers', 'Peripherals > Computer Audio > Speakers') // Double check this
      .replace(
        'Accessories > Media and Streaming > Adapters and Converters',
        'Peripherals > Adapters > Display Adapters'
      )
      .replace('Networking & Security > ', 'Networking > ')

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
  const unwantedSubstrings = [
    'Coming Soon',
    // 'On Promotion',
    'Just Arrived',
    'Unboxed',
    'Last Chance',
    'Apparel',
    'Hydroponics',
    ' > Mounts and Brackets',
    ' > Screen Protectors',
    ' > Cables',
    ' > Tools',
    ' > Mounts and Brackets',
    ' > Screen Protectors',
    ' > Mobile Devices > Stylus',
    ' > Smart Security',
    ' > Scooters and Bikes',
    ' > Wearables > Accessories',
    ' > Lifestyle Accessories'
  ]

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
