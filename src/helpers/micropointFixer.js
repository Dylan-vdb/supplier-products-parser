import { calculateFullPrice, saveSkuList } from '@/helpers/baseHelpers'
import { micropointUnwantedSubstrings } from '@/helpers/constants'

export function processMicropointStock(xmlData) {
  const products = xmlData.xml_data.items.item
  const wantedFields = removeUnwantedFields(products)
  const combinedCategories = combineCategoriesField(wantedFields)
  const categoriesRemoved = removeUnwantedCategories(combinedCategories)
  const duplicatesRemoved = removeDuplicates(categoriesRemoved)
  const promotedProductsHandled = handlePromotedProducts(duplicatesRemoved)
  const improvedCategoryNames = improveCategoryNames(promotedProductsHandled)
  const improvedCategoryCapitalization = improveCategoryCapitalization(improvedCategoryNames)
  const commonFieldMapping = mapToCommonFields(improvedCategoryCapitalization)
  const leaflessCategoryTrees = removeLeaflessCategoryTrees(commonFieldMapping)
  const finalProducts = saveSkuList(leaflessCategoryTrees, 'micropoint')

  return finalProducts
}

function removeLeaflessCategoryTrees(products) {
  return products.filter((product) => {
    return (
      product.categories !== 'Gadgets >' &&
      product.categories !== 'Gaming >' &&
      product.categories !== 'HDMI Products >' &&
      product.categories !== 'Components > Graphics Cards >'
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
      promo_starts,
      promo_ends,
      stock,
      images,
      description,
      categories,
      brand
    }) => {
      return {
        sku,
        name,
        normal_cost,
        sale_price,
        price,
        tags,
        promo_cost,
        promo_starts,
        promo_ends,
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
        published: 1
      }
    }
  )
}

function improveCategoryCapitalization(products) {
  const acronyms = new Set([
    'USB',
    'HDMI',
    'OTG',
    'VGA',
    'DVI',
    'RCA',
    'PS2',
    'PCI-E',
    'PCMCIA',
    'PCI',
    'MSATA',
    'HDD',
    'LDINO',
    'MOLEX',
    'KVM',
    'IDE',
    'SAS',
    'RJ11',
    'CAT',
    'CPU',
    'SSD',
    'AMD',
    'ATI',
    'AM2'
  ])

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
    const isPromoted = product.promo_cost > 0 && promotionEndDate > new Date()

    return isPromoted
      ? {
          ...product,
          tags: 'On Promotion',
          sale_price: calculateFullPrice(Number(product.promo_cost), 15, 15)
        }
      : product
  })
}

// Wanted fields are: item_number: SKU, short_description: name, detailed_decription: description, price, specialPrice: special_price, specialStartDate: promo_starts, specialEndDate: promo_ends, recommendedRetail: rrp_incl, category_description, group_description, quantity: stock, image_url: images
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
      sale_price: 0, // default until calculated in handlePromotedProducts
      price: product.recommendedRetail,
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
  // Merge the two columns into one with the same '>' separator as symtech stock.
  return products.map((product) => {
    const combinedCategories = `${product.category_description} > ${product.group_description}`
    return { ...product, categories: combinedCategories }
  })
}

function removeUnwantedCategories(products) {
  const unwantedSubstrings = micropointUnwantedSubstrings

  let preFiltered = products.filter((product) => {
    const emptyOfSubcategories =
      (product.category_description == 'SOUND' && product.group_description == '') ||
      (product.category_description == 'MOUSE' && product.group_description == '')
    const brokenImageLink = product.images.endsWith('.jfif')

    return !emptyOfSubcategories && !brokenImageLink
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

function improveCategoryNames(products) {
  const replacements = [
    ['ADAPTERS >', `Peripherals > Adapters >`],
    ['ADD-ON CARDS >', 'Components > Expansion and PCIe Adapters >'],
    ['ANCILLARY ITEMS >', 'Gadgets >'],
    ['APPLE >', 'Components > Apple'],
    ['CABLES >', 'Peripherals > Cables >'],
    ['CABLES : MEDIA', 'Peripherals > Cables > Media'],
    ['CABLES : NETWORK', 'Peripherals > Cables > Network'],
    ['CABLES : POWER', 'Peripherals > Cables > Power'],
    ['FLASH DRIVES AND MICRO-SD > FLASH DRIVES', 'Peripherals > Storage > Flash Drives'],
    ['FLASH DRIVES AND MICRO-SD > MICRO SD', 'Peripherals > Storage > Micro SD'],
    ['FLASH DRIVES AND MICRO-SD > USB', 'Peripherals > Storage > Flash Drives'],
    ['GRAPHIC CARDS >', 'Components > Graphics Cards >'],
    ['HARD DRIVES > 2.5" SSD', 'Components > Solid State Drives > Consumer'],
    ['HARD DRIVES > 3.5" SSD', 'Components > Solid State Drives > Consumer'],
    ['HARD DRIVES > 2.5" HDD', 'Components > Disk Drives > Consumer'],
    ['HARD DRIVES > 2.5" SATA HDD', 'Components > Disk Drives > Consumer'],
    ['HARD DRIVES > 3.5" SATA HDD', 'Components > Disk Drives > Consumer'],
    ['HARD DRIVES > EXTERNAL 2.5" HDD', 'Peripherals > Storage > External Disk Drives'],
    ['HARD DRIVES > HDD DOCKING', 'Peripherals > Storage > Enclosures'],
    ['NETAC > FLASH DRIVES', 'Peripherals > Storage > Flash Drives'],
    ['NETAC > MICRO SD', 'Peripherals > Storage > Micro SD'],
    ['NETAC > EXTERNAL 2.5" HDD', 'Peripherals > Storage > External Disk Drives'],
    ['NETAC > 2.5" SSD', 'Components > Solid State Drives > Consumer'],
    ['HEADSETS > GAMING', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
    ['HEADSETS > HEADSET', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
    ['HEADSETS > SOUND', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
    ['KEYBOARDS > ACCESSORIES', 'Peripherals > Keyboards > Keyboard Accessories'],
    ['KEYBOARDS > GAMING', 'Peripherals > Keyboards > Gaming Keyboards'],
    ['KEYBOARDS > BLUETOOTH', 'Peripherals > Keyboards > Office Keyboards'],
    ['KEYBOARDS > CORDER', 'Peripherals > Keyboards > Office Keyboards'],
    ['KEYBOARDS > DESKTOP KEYBOARD', 'Peripherals > Keyboards > Office Keyboards'],
    ['KEYBOARDS > GAMING', 'Peripherals > Keyboards > Gaming Keyboards'],
    ['KEYBOARDS > USB', 'Peripherals > Keyboards > Office Keyboards'],
    ['KEYBOARDS > WIRELESS', 'Peripherals > Keyboards > Office Keyboards'],
    ['MEMORY > DESKTOP MEMORY', 'Components > Memory > Desktop Memory'],
    ['MEMORY > FLASH DRIVES', 'Components > Memory > Flash Drives'],
    ['MEMORY > GAMING', 'Components > Memory > Gaming Memory'],
    ['MEMORY > MICRO SD', 'Components > Memory > Micro SD'],
    ['MEMORY > NOTEBOOK MEMORY', 'Components > Memory > Notebook Memory'],
    ['MEMORY > MEMORY >', 'Components > Memory > Notebook Memory'],
    [/^MICROSOFT >.*/giu, 'Components > Software'],
    [/^SOFTWARE >.*/giu, 'Components > Software'],
    [/^MINI PC >.*/giu, 'Mini PCs > Complete Systems'],
    [/^MONITORS >.*/giu, 'Components > Software'],
    ['MOTHERBOARDS >', 'Components > Motherboards >'],
    [/^MOUSE > GAMING.*$/giu, 'Peripherals > Mice > Gaming Mice'],
    ['MOUSE > CORDER', 'Peripherals > Mice > Gaming Mice'],
    ['MOUSE > MOUSE PAD', 'Accessories > Mousepads'],
    ['MOUSE > USB', 'Peripherals > Mice > Office Mice'],
    ['MOUSE > WIRED MOUSE', 'Peripherals > Mice > Office Mice'],
    ['MOUSE > WIRELESS MOUSE', 'Peripherals > Mice > Office Mice'],
    ['NETBOOKS > INTEL CELERON', 'Notebooks'],
    ['NOTEBOOKS > ACCESSORIES', 'Accessories > Notebook Accessories'],
    ['NOTEBOOK BAGS > SLEEVE', 'Accessories > Bags and Covers > Sleeves'],
    ['NOTEBOOK BAGS > TABLET  SLEEVES', 'Accessories > Bags and Covers > Sleeves'],
    [/^NOTEBOOK ACCESSORIES >.*/giu, 'Accessories > Notebook Accessories'],
    [/^NOTEBOOK BAGS >\s*\S.*$/giu, 'Accessories > Bags and Covers > Bags'],
    [/^NOTEBOOKS >\s*\S.*$/giu, 'Notebooks'],
    ['NETWORKING > 3G / LTE DEVICES', 'Networking > Portable Routers'],
    ['NETWORKING > ACCESSORIES', 'Networking > Accessories'],
    ['NETWORKING > CONSUMABLES', 'Networking > Consumables'],
    ['NETWORKING > ROUTERS', 'Networking > Routers and Mesh'],
    ['NETWORKING > SWITCHES', 'Networking > Switches'],
    ['SOUND > EARPHONES', 'Peripherals > Computer Audio > Headsets > In-Ears'],
    ['SOUND > HEADSET', 'Peripherals > Computer Audio > Headsets > Over-Ears'],
    ['SOUND > MICROPHONE', 'Peripherals > Computer Audio > Microphones'],
    ['SOUND > SPEAKERS', 'Peripherals > Computer Audio > Speakers'],
    ['SOUND > MP3', 'Gadgets > Audio'],
    [/^SPEAKERS >.*$/giu, 'Peripherals > Computer Audio > Speakers'],
    ['SPLITTERS >', 'Peripherals > Splitters >'],
    ['SWITCHES > ', 'Peripherals > Switches >'],
    ['TABLETS >', 'Tablets >'],
    [/^UPS > \d+VA *\w*$/giu, 'Power Solutions > PC UPS'],
    ['UPS > INVERTER', 'Power Solutions > Inverters'],
    [/^USB \w*DEVICES > \w* *\w*$/giu, 'Peripherals > USB Devices'],
    ['USB ADDON DEVICES > (BLUETOOTH|NETWORK|SOUND)', 'Peripherals > USB Devices'],
    [/^USB HUB >\s*\S.*$/giu, 'Peripherals > USB Devices'],
    ['GAMING', 'Gaming'],
    ['ACCESSORIES', 'Accessories'],
    ['BLUETOOTH', 'Bluetooth'],
    ['GADGETS', 'Gadgets'],
    ['CPU FANS', 'CPU Fans'],
    ['DESKTOP MEMORY', 'Desktop Memory'],
    ['INTEL CORE I5', 'Intel Core i5'],
    ['INTEL CORE I7', 'Intel Core i7'],
    ['INTEL CORE I3', 'Intel Core i3'],
    ['INTEL CORE I9', 'Intel Core i9'],
    ['MOUSE PAD', 'Mouse Pad'],
    ['WIRELESS', 'Wireless']
  ]
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
