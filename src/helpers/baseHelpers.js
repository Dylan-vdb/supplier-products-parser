import { featuredCategories } from './constants'
import Papa from 'papaparse'

export async function fetchLocalCsvFile(path) {
  try {
    const response = await fetch(path); // Path relative to public folder

    const csvText = await response.text();
    const data = await parseCsv(csvText)
    return data.data
  } catch (error) {
    console.error('Error fetching CSV file:', error);
  }
}

export async function applyCategories(products, supplier) {
  const categories = await fetchLocalCsvFile(`/product-categories/${supplier}.csv`)
  const categoryMap = categories.reduce((map, product) => {
    map[product.sku] = product.categories
    return map
  }, {})

  const result = products.map((product) => {
    const category = categoryMap[product.sku]
    return { ...product, categories: category }
  })

  const newProducts = result.filter((product) => !product.categories).map(({
    sku,
    name,
    originalCategory,
    categories,
    tags,
    is_featured,
    images,
    brand
  }) => {
    return {   
      sku,
      name,
      originalCategory,
      categories,
      tags,
      is_featured,
      images,
      brand
    }
  })
  debugger
  return result
}

function parseCsv(csvFile) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      delimiter: ";",	
      complete: (results) => {
        resolve(results)
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}

export function calculateFullPrice({ price, margin, vat }) {
  const marginPercentage = margin / 100
  const vatPercentage = vat / 100

  const priceWithVat = Math.round(price * (1 + marginPercentage) * (1 + vatPercentage))
  return priceWithVat
}

export function saveSkuList(products, supplier) {
  const skuList = products.map((product) => product.sku)
  const existingListString = localStorage.getItem(`${supplier}SkuListNew`)
  if (existingListString) {
    localStorage.setItem(`${supplier}SkuListOld`, existingListString)
  }
  localStorage.setItem(`${supplier}SkuListNew`, JSON.stringify(skuList))
  return products
}

export function handleLowStocks(products) {
  return products.map((product) => {
    let newStock = Number(product.stock)
    const isFrontosa = product?.images?.includes('https://ik.imagekit.io/ajwhrydzs/FlattenedImages')
    const isEsquire = product?.images?.includes('www.xyz.co.za')

    if (!isFrontosa && !isEsquire && newStock <= 5) {
      newStock = 0
    }

    if (isEsquire && newStock <= 3) {
      newStock = 0
    }

    return {
      ...product,
      stock: newStock
    }
  })
}

export function adjustCablesPricing(products) {
  const result = products.map((product) => {
    if (product?.categories?.startsWith('Cables')) {
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

export function adjustAdaptersAndConnectorsPricing(products) {
  return products.map((product) => {
    if (product?.categories?.includes('Connectors Adaptors & Converters')) {
      const newFullPrice = calculateFullPrice({
        price: product.normal_cost,
        margin: 30,
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
}

export function refineFeaturedItems(products) {
  return products.map((product) => {
    const updatedProduct = { ...product }

    // Only check categories if the product was previously featured
    if (product.is_featured === 1) {
      // Check if any of the product's categories include any of the featured categories
      const isFeatured = featuredCategories.some((featuredCategory) =>
        product?.categories?.includes(featuredCategory)
      )

      // Only update is_featured if the categories don't match (un-featuring the product)
      if (!isFeatured) {
        updatedProduct.is_featured = 0
      }
    }

    return updatedProduct
  })
}
