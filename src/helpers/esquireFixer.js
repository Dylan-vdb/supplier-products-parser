import { calculateFullPrice, saveSkuList } from '../helpers/baseHelpers'
import esquireStock from '@/helpers/esquireData.json'
import { esquireCategoryReplacements } from './constants'
import Papa from 'papaparse'

export function processEsquireStock() {
    if (!Array.isArray(esquireCategoryReplacements)) {
        console.error('Category replacements not loaded correctly:', esquireCategoryReplacements)
        return
    }

    const duplicatesRemoved = removeDuplicates(esquireStock)
    const tidiedProducts = tidyFields(duplicatesRemoved)
    const unmappedCategories = findUnmappedCategories(tidiedProducts)
    const categorizedProducts = improveCategoryNames(tidiedProducts)
    const pricedProducts = priceProducts(categorizedProducts)
    debugger
    console.log(`Found ${unmappedCategories.totalUnmapped} products with unmapped categories:`, 
        unmappedCategories.unmappedCategories)
    // downloadCategories();
}

function tidyFields(products) {
    return products.map(product => {
        // Destructure the fields we want to rename, collecting the rest
        const { productCode, price, imgURL, productName, groupName, ...rest } = product
        
        // Return new object with renamed fields and remaining fields
        return {
            ...rest,
            sku: productCode,
            normal_cost: price,
            image_url: imgURL,
            name: productName,
            categoriesOld: groupName?.trim().replace(/\s+/g, ' ') // Replace multiple spaces with single space
        }
    }).filter(product => product.image_url !== "")
}

function findUnmappedCategories(products) {
    if (!Array.isArray(esquireCategoryReplacements)) {
        console.error('Cannot find unmapped categories: replacements not loaded')
        return { totalUnmapped: 0, unmappedCategories: [], details: {} }
    }

    // Get all the source categories from our replacement mappings
    const mappedCategories = new Set(
        esquireCategoryReplacements.map(([sourceCategory]) => 
            sourceCategory.toLowerCase().replace(/[^a-z0-9\s]/g, '')
        )
    )

    // Find products whose categories don't match any of our mapped categories
    const unmappedProducts = products.filter(product => {
        const cleanCategory = product.categoriesOld?.toLowerCase().replace(/[^a-z0-9\s]/g, '') || ''
        return !mappedCategories.has(cleanCategory)
    })

    // Group unmapped products by their category for easier review
    const groupedByCategory = unmappedProducts.reduce((acc, product) => {
        const category = product.categoriesOld || 'No Category'
        if (!acc[category]) {
            acc[category] = []
        }
        acc[category].push({
            sku: product.sku,
            name: product.name
        })
        return acc
    }, {})

    return {
        totalUnmapped: unmappedProducts.length,
        unmappedCategories: Object.keys(groupedByCategory),
        details: groupedByCategory
    }
}

function removeDuplicates(products) {
    const seenProducts = products.reduce((acc, product) => {
        const productCode = product.productCode
        if (!acc.has(productCode)) {
            acc.set(productCode, product)
        }
        return acc
    }, new Map())

    const uniqueProducts = Array.from(seenProducts.values())

    console.log(`Removed ${products.length - uniqueProducts.length} duplicates`)

    return uniqueProducts
}

function improveCategoryNames(products) {
    return products.map(product => {
        // Get the old category and clean it up
        const oldCategory = product.categoriesOld?.trim() || ''
        
        // Find a matching replacement
        const replacement = esquireCategoryReplacements.find(([source]) => source === oldCategory)
        
        // Return product with new categories field, null if no replacement found
        return {
            ...product,
            categories: replacement ? replacement[1] : null
        }
    }).filter(product => product.categories !== null)
}

function priceProducts(products) {
    return products.map(product => {
        const cost = parseFloat(product.normal_cost)
        if (isNaN(cost)) {
            console.warn(`Invalid price for product ${product.sku}: ${product.normal_cost}`)
            return product
        }
        return {
            ...product,
            price: calculateFullPrice({
                price: cost,
                margin: 16,
                vat: 15
            })
        }
    })
}

function downloadCategories() {
    // Create a Set to store unique categories
    const categories = new Set();
    
    // Extract categories from each product
    esquireStock.forEach(product => {
        if (product.groupName) {
            categories.add(product.groupName);
        }
    });
    
    // Convert Set to sorted array
    const uniqueCategories = Array.from(categories).sort();
    
    // Prepare data for CSV (array of objects with single column)
    const refinedCategories = uniqueCategories.map(category => ({ Category: category }));
    
    // Generate CSV content using Papa Parse
    const csvContent = Papa.unparse(refinedCategories, {
        delimiter: ';',
        quoteChars: '""'
    });

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);
    link.download = `esquire-categories-${today}.csv`;
    
    // Trigger download
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}