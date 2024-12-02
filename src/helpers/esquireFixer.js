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
    const finalProducts = saveSkuList(pricedProducts, 'esquire')

    // downloadCategories();
    return finalProducts
}

function tidyFields(products) {
    return products.map(product => {
        // Destructure the fields we want to rename, collecting the rest
        const { productCode, price, imgURL, productName, groupName, description, url, ...rest } = product
        
        // Return new object with renamed fields and remaining fields
        return {
            ...rest,
            sku: `SQR-${productCode}`,
            normal_cost: price,
            images: imgURL,
            name: productName,
            description: description.replaceAll(', ', '\n'),
            categoriesOld: groupName?.trim().replace(/\s+/g, ' ') // Replace multiple spaces with single space
        }
    }).filter(product => product.images !== "")
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
    if (lowerDesc.includes('drum unit') || 
        lowerDesc.includes('black cartridge') || 
        lowerDesc.includes('toner')) {
        return 'Printers > Cartridges > Toner Cartridges'
    }
    
    return null
}

function improveCategoryNames(products) {
    return products.map(product => {
        // Get the old category and clean it up
        const oldCategory = product.categoriesOld?.trim() || ''
        
        // Special case for USB Gadgets
        if (oldCategory === 'USB Gadgets') {
            const description = product.description
            const lowerName = description.toLowerCase()
            let category = 'Gadgets'
            if (lowerName.includes('adapter cable') || lowerName.includes('printer converter')) {
                category = 'Connectors Adaptors & Converters'
            }
            if (lowerName.includes('dream cheeky')) {
                category = 'Gadgets > Fun'
            }
            if (lowerName.includes('selfie led ring')) {
                category = 'Gadgets > Media & Streaming > Ring Lights'
            }
            return {
                ...product,
                categories: category
            }
        }

        if (oldCategory === 'Notebook Accessories') {
            const description = product.description
            if (description.includes('AirBar Touchscreen Sensor')) {
                return {
                    ...product,
                    categories: 'Notebook Components > Screens'
                }
            }

            if (description.includes('USB 3.1 Type')) {
                return {
                    ...product,
                    categories: 'Peripherals > USB Devices'
                }
            }
            if (description.includes('Legion') || description.includes('Briefcase Alarm')) {
                return {
                    ...product,
                    categories: 'Notebook Components > Locks'
                }
            }
            if (description.includes('PCMCIA')) {
                return {
                    ...product,
                    categories: 'Desktop Components > Expansion & Pcie Adapters > PCMCIA'
                }
            }
            if (description.includes('PCMCIA')) {
                return {
                    ...product,
                    categories: 'Desktop Components > Expansion & Pcie Adapters > PCMCIA'
                }
            }
        }

        // Special case for Notebook Bags and Cases
        if (oldCategory === 'Notebook Bags and Cases') {
            const bagCategory = getBagCategoryFromDescription(product.description)
            if (bagCategory) {
                return {
                    ...product,
                    categories: bagCategory
                }
            }
        }

        // Special case for Ink and Toners
        if (oldCategory === 'Ink and Toners-Generic' || oldCategory === 'Ink and Toners-Original') {
            const cartridgeCategory = getCartridgeCategoryFromDescription(product.description)
            if (cartridgeCategory) {
                return {
                    ...product,
                    categories: cartridgeCategory
                }
            }
        }
        
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

        const isOnSpecial = product.status === 1
        
        const regularPrice = calculateFullPrice({
            price: cost,
            margin: isOnSpecial ? 25 : 16,
            vat: 15
        })

        return {
            ...product,
            price: regularPrice,
            sale_price: isOnSpecial ? calculateFullPrice({
                price: cost,
                margin: 16,
                vat: 15
            }) : null,
            tags: isOnSpecial ? 'On Sale' : null,
            // is_featured: isOnSpecial ? 1 : 0
            is_featured: 0
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