import { calculateFullPrice, saveSkuList } from '../helpers/baseHelpers'
import { DIY, LIFESTYLE, STATIONERY } from '../helpers/constants'

const categoryGroupsList = [DIY, LIFESTYLE, STATIONERY, TECH]

let topCategory
export function processEsquireExtras(xmlData, mainCategory) {
  topCategory = mainCategory
  const rawData = xmlData.ROOT.Products.Product
  const correctedFields = correctFields(rawData).filter(
    (product) => product.leafCategory.length > 0
  )
  const pricedProducts = priceProducts(correctedFields)
  const withinWeight = pricedProducts.filter((product) => product.weight < 14500) //14500 grams
  const categorizedProducts = categorizeProducts(withinWeight)
  const goodImages = categorizedProducts.filter(
    (product) => product.images.length > 0 && !product.images.includes('http://')
  )
  const finalProducts = saveSkuList(goodImages, getGroupName(topCategory))
  debugger
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
        stock: AvailableQty >= 1 ? AvailableQty : 0,
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
  if (topCategory === 'DIY Hardware & Tools') return `DIY-${productId}`
  if (topCategory === 'Lifestyle & Appliances') return `LSTL-${productId}`
  if (topCategory === 'Stationery') return `STAT-${productId}`
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

function categorizeProducts(products) {
  return products.map((product) => {
    return {
      ...product,
      categories: product.headCategory
        ? `${topCategory} > ${product.headCategory} > ${product.leafCategory}`
        : `${topCategory} > ${product.leafCategory}`
    }
  })
}
