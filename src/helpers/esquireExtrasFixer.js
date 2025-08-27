import { calculateFullPrice, saveSkuList, applyCategories } from '../helpers/baseHelpers'
import { DIY, LIFESTYLE, STATIONERY, TECH } from '../helpers/constants'

const categoryGroupsList = [DIY, LIFESTYLE, STATIONERY, TECH]

let topCategory
export async function processEsquireExtras(xmlData, mainCategory) {
  topCategory = mainCategory
  const rawData = xmlData.ROOT.Products.Product
  const correctedFields = correctFields(rawData).filter(
    (product) => product.leafCategory.length > 0
  )

  const pricedProducts = priceProducts(correctedFields)
  const withinWeight = pricedProducts.filter((product) => product.weight < 14500) //14500 grams
  const categorizedProducts = await categorizeProducts(withinWeight)
  const goodCategories = categorizedProducts.filter((product) => product.categories !== 'Not to import')

  const goodImages = goodCategories.filter(
    (product) => product.images.length > 0 && !product.images.includes('http://')
  )
  const finalProducts = saveSkuList(goodImages, getGroupName(topCategory))
  return finalProducts
}

function getGroupName(topCategory) {
  const group = categoryGroupsList.find((group) => group.category.includes(topCategory))
  return group.id
}

/**
Cables & Adapters
Cameras & Camcorders
Computer Gaming Hardware
Computer Monitor Accessories
Console Gaming Accessories
HDMI Products
LED Lightning
Mobile Phone Accessories
Mobile Phone Covers
Networking-Active
Notebook Accessories
Notebook Bags and Cases
Tablet PC's Covers
Televisions
Toolkit and Test equipment
Wireless Network Products

  
  Printer Accessories <-- Move to computer
 */

function correctFields(products) {
  const result = products.map(
    ({
      AvailableQty,
      Category,
      CategoryHead,
      HeightCM,
      LengthCM,
      WidthCM,
      MassKG,
      Price,
      ProductCode,
      ProductDescription,
      ProductName,
      image
    }) => {
      return {
        stock: AvailableQty > 1 ? AvailableQty : 0,
        sku: modifyProductId(ProductCode),
        normal_cost: Price,
        images: image,
        name: ProductName,
        description: ProductDescription,
        leafCategory: Category,
        headCategory: CategoryHead,
        height: HeightCM,
        length: LengthCM,
        width: WidthCM,
        weight: Number(MassKG) * 1000
      }
    }
  )
  return result
}

function modifyProductId(productId) {
  if (topCategory === DIY.category) return `DIY-${productId}`
  if (topCategory === LIFESTYLE.category) return `LSTL-${productId}`
  if (topCategory === STATIONERY.category) return `STAT-${productId}`
  if (topCategory === TECH.category) return `SQR-${productId}`
}

function priceProducts(products) {
  return products.map((product) => {
    return {
      ...product,
      price: calculateFullPrice({
        price: Number(product.normal_cost),
        margin: 17,
        vat: 15
      })
    }
  })
}

async function categorizeProducts(products) {
  if (topCategory === TECH.category)
    // Use category csv for tech
    return await applyCategories(products, 'EsquireTech')

  return products.map((product) => {
    return {
      ...product,
      originalCategory: product.leafCategory,
      categories: product.headCategory
        ? `${topCategory} > ${product.headCategory} > ${product.leafCategory}`
        : `${topCategory} > ${product.leafCategory}`
    }
  })
}

function modifyCategory(categories) {
  const categoriesList = categories.split(',')
  const result = categoriesList.map((category) => {
    return `Computers Laptops & Electronics > ${category}`
  })
  return result.join(',')
}

function getBagCategoryFromDescription(description = '') {
  const lowerDesc = description.toLowerCase()

  if (lowerDesc.includes('backpack')) {
    return 'Bags Cases & Covers > Backpacks'
  }
  if (lowerDesc.includes('trolley')) {
    return 'Bags Cases & Covers > Trolleys'
  }
  if (lowerDesc.includes('notebook bag') || lowerDesc.includes('sling-style carrier')) {
    return 'Bags Cases & Covers > Bags'
  }
  if (lowerDesc.includes('case') || lowerDesc.includes('briefcase')) {
    return 'Bags Cases & Covers > Cases'
  }
  if (lowerDesc.includes('anti-theft luggage zipper strap')) {
    return 'Notebook Components > Locks'
  }
  if (lowerDesc.includes('sleeve')) {
    return 'Bags Cases & Covers > Sleeves'
  }
  return null
}

function getCartridgeCategoryFromDescription(description = '') {
  const lowerDesc = description.toLowerCase()

  // Check for ink cartridges first
  if (lowerDesc.includes('ink cartridge') || lowerDesc.includes('inkjet cartridge')) {
    return 'Printers > Cartridges > Ink Cartridges'
  }

  // Check for toner cartridges
  if (
    lowerDesc.includes('drum unit') ||
    lowerDesc.includes('black cartridge') ||
    lowerDesc.includes('toner')
  ) {
    return 'Printers > Cartridges > Toner Cartridges'
  }

  return null
}
