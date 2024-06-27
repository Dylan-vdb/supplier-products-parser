import { calculateFullPrice } from '../helpers/baseHelpers'

export function processMicropointStock(xmlData) {
  const products = xmlData.xml_data.items.item
  const wantedFields = removeUnwantedFields(products)
  const combinedCategories = combineCategoriesField(wantedFields)
  const categoriesRemoved = removeUnwantedCategories(combinedCategories)
  const promotedProductsHandled = handlePromotedProducts(categoriesRemoved)
  const improvedCategoryNames = improveCategoryNames(promotedProductsHandled)
  const improvedCategoryCapitalization = improveCategoryCapitalization(improvedCategoryNames)

  return improvedCategoryCapitalization
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
    const isPromoted =
      product.specialPrice > 0 && promotionEndDate > new Date('15/06/2024  00:00:00') // TODO get back to compare with today.

    return isPromoted
      ? {
          ...product,

          tags: 'On Promotion',
          sale_price: calculateFullPrice(Number(product.specialPrice), 15, 15),
          price: product.rrp_incl
        }
      : product
  })
}

// Wanted fields are: item_number: SKU, short_description: name, detailed_decription: description, price, specialPrice: special_price, specialStartDate: promo_starts, specialEndDate: promo_ends, recommendedRetail: rrp_incl, category_description, group_description, quantity: stock, image_url: images
function removeUnwantedFields(products) {
  return products.map((product) => {
    return {
      sku: product.item_number,
      name: product.short_description,
      category_description: product.category_description,
      group_description: product.group_description,
      normal_cost: product.price,
      rrp_incl: product.recommendedRetail,
      promo_cost: product.specialPrice,
      promo_starts: product.specialStartDate,
      promo_ends: product.specialEndDate,

      stock: product.quantity,
      images: product.image_url,

      description: product.detailed_description
    }
  })
}

function improveCategoryNames(products) {
  return products.reduce((updatedProducts, product) => {
    const updatedCategoryTree = product.combinedCategories
      .replace('ADAPTERS >', `Peripherals > Adapters >`)

      .replace('ADD-ON CARDS >', 'Components > Expansion and PCIe Adapters >')

      .replace('ANCILLARY ITEMS >', 'Gadgets >')
      .replace('APPLE >', 'Components > Apple')
      .replace('CABLES >', 'Peripherals > Cables >')
      .replace('CABLES : MEDIA', 'Peripherals > Cables > Media')
      .replace('CABLES : NETWORK', 'Peripherals > Cables > Network')
      .replace('CABLES : POWER', 'Peripherals > Cables > Power')
      .replace('FLASH DRIVES AND MICRO-SD > FLASH DRIVES', 'Peripherals > Storage > Flash Drives')
      .replace('FLASH DRIVES AND MICRO-SD > MICRO SD', 'Peripherals > Storage > Micro SD')
      .replace('FLASH DRIVES AND MICRO-SD > USB', 'Peripherals > Storage > Flash Drives')
      .replace('GRAPHIC CARDS >', 'Components > Graphics Cards >')

      .replace('HARD DRIVES > 2.5" SSD', 'Components > Solid State Drives > Consumer')
      .replace('HARD DRIVES > 3.5" SSD', 'Components > Solid State Drives > Consumer')
      .replace('HARD DRIVES > 2.5" HDD', 'Components > Disk Drives > Consumer')
      .replace('HARD DRIVES > 2.5" SATA HDD', 'Components > Disk Drives > Consumer')
      .replace('HARD DRIVES > 3.5" SATA HDD', 'Components > Disk Drives > Consumer')
      .replace('HARD DRIVES > EXTERNAL 2.5" HDD', 'Peripherals > Storage > External Disk Drives')
      .replace('HARD DRIVES > HDD DOCKING', 'Peripherals > Storage > Enclosures')

      .replace('NETAC > FLASH DRIVES', 'Peripherals > Storage > Flash Drives')
      .replace('NETAC > MICRO SD', 'Peripherals > Storage > Micro SD')
      .replace('NETAC > EXTERNAL 2.5" HDD', 'Peripherals > Storage > External Disk Drives')
      .replace('NETAC > 2.5" SSD', 'Components > Solid State Drives > Consumer')

      .replace('HEADSETS > GAMING', 'Peripherals > Computer Audio > Headsets > Over-Ears')
      .replace('HEADSETS > HEADSET', 'Peripherals > Computer Audio > Headsets > Over-Ears')
      .replace('HEADSETS > SOUND', 'Peripherals > Computer Audio > Headsets > Over-Ears')
      .replace('KEYBOARDS > ACCESSORIES', 'Peripherals > Keyboards > Keyboard Accessories')
      .replace('KEYBOARDS > GAMING', 'Peripherals > Keyboards > Gaming Keyboards')
      .replace('KEYBOARDS > BLUETOOTH', 'Peripherals > Keyboards > Office Keyboards')
      .replace('KEYBOARDS > CORDER', 'Peripherals > Keyboards > Office Keyboards')
      .replace('KEYBOARDS > DESKTOP KEYBOARD', 'Peripherals > Keyboards > Office Keyboards')
      .replace('KEYBOARDS > GAMING', 'Peripherals > Keyboards > Gaming Keyboards')
      .replace('KEYBOARDS > USB', 'Peripherals > Keyboards > Office Keyboards')
      .replace('KEYBOARDS > WIRELESS', 'Peripherals > Keyboards > Office Keyboards')

      .replace('MEMORY > DESKTOP MEMORY', 'Components > Memory > Desktop Memory')
      .replace('MEMORY > FLASH DRIVES', 'Components > Memory > Flash Drives')
      .replace('MEMORY > GAMING', 'Components > Memory > Gaming Memory')
      .replace('MEMORY > MICRO SD', 'Components > Memory > Micro SD')
      .replace('MEMORY > NOTEBOOK MEMORY', 'Components > Memory > Notebook Memory')
      .replace('MEMORY > MEMORY >', 'Components > Memory > Notebook Memory')
      // ^SOFTWARE >\.*.\S*
      .replace(/^MICROSOFT >.*/giu, 'Components > Software')
      .replace(/^SOFTWARE >.*/giu, 'Components > Software')
      .replace(/^MINI PC >.*/giu, 'Mini PCs > Complete Systems')
      // MONITORS >
      .replace(/^MONITORS >.*/giu, 'Components > Software')
      .replace('MOTHERBOARDS >', 'Components > Motherboards >')
      .replace(/^MOUSE > GAMING.*$/giu, 'Peripherals > Mice > Gaming Mice')
      .replace('MOUSE > CORDER', 'Peripherals > Mice > Gaming Mice')
      .replace('MOUSE > MOUSE PAD', 'Accessories > Mousepads')
      .replace('MOUSE > USB', 'Peripherals > Mice > Office Mice')
      .replace('MOUSE > WIRED MOUSE', 'Peripherals > Mice > Office Mice')
      .replace('MOUSE > WIRELESS MOUSE', 'Peripherals > Mice > Office Mice')

      .replace('NETBOOKS > INTEL CELERON', 'Notebooks')
      .replace('NOTEBOOKS > ACCESSORIES', 'Accessories > Notebook Accessories')
      .replace('NOTEBOOK BAGS > SLEEVE', 'Accessories > Bags and Covers > Sleeves')
      .replace('NOTEBOOK BAGS > TABLET  SLEEVES', 'Accessories > Bags and Covers > Sleeves')
      .replace(/^NOTEBOOK ACCESSORIES >.*/giu, 'Accessories > Notebook Accessories')
      .replace(/^NOTEBOOK BAGS >\s*\S.*$/giu, 'Accessories > Bags and Covers > Bags')
      .replace(/^NOTEBOOKS >\s*\S.*$/giu, 'Notebooks')

      .replace('NETWORKING > 3G / LTE DEVICES', 'Networking > Portable Routers')
      .replace('NETWORKING > ACCESSORIES', 'Networking > Accessories')
      .replace('NETWORKING > CONSUMABLES', 'Networking > Consumables')
      .replace('NETWORKING > ROUTERS', 'Networking > Routers and Mesh')
      .replace('NETWORKING > SWITCHES', 'Networking > Switches')

      .replace('SOUND > EARPHONES', 'Peripherals > Computer Audio > Headsets > In-Ears')
      .replace('SOUND > HEADSET', 'Peripherals > Computer Audio > Headsets > Over-Ears')
      .replace('SOUND > MICROPHONE', 'Peripherals > Computer Audio > Microphones')
      .replace('SOUND > SPEAKERS', 'Peripherals > Computer Audio > Speakers')
      .replace('SOUND > MP3', 'Gadgets > Audio')
      .replace(/^SPEAKERS >.*$/giu, 'Peripherals > Computer Audio > Speakers')
      .replace('SPLITTERS >', 'Peripherals > Splitters >')
      .replace('SWITCHES > ', 'Peripherals > Switches >')
      .replace('TABLETS >', 'Tablets >')

      .replace(/^UPS > \d+VA *\w*$/giu, 'Power Solutions > PC UPS')

      .replace('UPS > INVERTER', 'Power Solutions > Inverters')

      .replace(/^USB \w*DEVICES > \w* *\w*$/giu, 'Peripherals > USB Devices')
      .replace(/USB ADDON DEVICES > (BLUETOOTH|NETWORK|SOUND)/giu, 'Peripherals > USB Devices')
      .replace(/^USB HUB >\s*\S.*$/giu, 'Peripherals > USB Devices')
      // Ensure that after all the above, no category ends with '>'
      .replace(/ > $/giu, '')
      .replace('GAMING', 'Gaming')
      .replace('ACCESSORIES', 'Accessories')
      .replace('BLUETOOTH', 'Bluetooth')
      .replace('GADGETS', 'Gadgets')
      .replace('CPU FANS', 'CPU Fans')
      .replace('DESKTOP MEMORY', 'Desktop Memory')
      .replace('INTEL CORE I5', 'Intel Core i5')
      .replace('INTEL CORE I7', 'Intel Core i7')
      .replace('INTEL CORE I3', 'Intel Core i3')
      .replace('INTEL CORE I9', 'Intel Core i9')
      .replace('MOUSE PAD', 'Mouse Pad')
      .replace('WIRELESS', 'Wireless')

    updatedProducts.push({ ...product, categories: updatedCategoryTree })
    return updatedProducts
  }, [])
}

function removeUnwantedCategories(products) {
  const unwantedSubstrings = [
    'ACCESS POINT',
    'AA STOCK CLEARANCE >',
    'BATTERIES >',
    'BLUETOOTH DEVICES >',
    'BUNDLES >',
    'CAMERAS >',
    'CARTRIDGES >',
    'CASES >',
    'CCTV >',
    'CONSUMABLES >',
    'CONVERTER BOXES >',
    'DESKTOP MACHINE >',
    'DVI PRODUCTS >',
    'EXTENDERS >',
    'EXTERNAL ENCLOSURES >',
    'FANS >',
    'FLEA MARKET >',
    'FOR SUPPLIER STOCK PURPOSES >',
    'HARD DRIVES > NOTE BOOK DRIVE CADDY',
    'HARD DRIVES > REFURBISHED STOCK',
    'HARD DRIVES > SUPPLIER STOCK',
    'HEALTHCARE >',
    'KVM SWITCHES >',
    'LAN PRODUCTS >',
    'LOGITECH >',
    'MEDIA PLAYERS >',
    'MINING >',
    'MT-VIKI >',
    'MULTIPLUGS >',
    'NETWORK CABLE >',
    'NETWORKING > ADSL MODEMS / ROUTERS',
    'NETWORKING > CABLES',
    'NETWORKING > CAT6 CABLES',
    'NETWORKING > KVM SWITCHES',
    'NETWORKING > MEDIA CONVERTERS',
    'NETWORKING > POWER OF ETHERNET',
    'NETWORKING > USB',
    'NOT FOR LISTING >',
    'NOTEBOOK BAGS > CAMERA',
    'NOTEBOOKS > REFURBISHED STOCK',
    'NOTEBOOKS > WARRANTY',
    'OPTICAL DRIVES >',
    'ORICO ITEMS >',
    'PARTS >',
    'PARTS FOR REPAIRING >',
    'POINT OF SALE >',
    'POWER SUPPLY >',
    'PRINTERS >',
    'PROCESSORS > THERMAL PASTE',
    'PROJECTORS >',
    'REFURBISHED >',
    'ROUTERS >',
    'SANITIZER >',
    'SERVERS >',
    'SLEEVE >',
    'SOLID STATE DRIVE >',
    'TOOLS >',
    'TP-LINK >',
    'TRANSMITTERS >',
    'TV >',
    'WARRANTY >',
    'MICROSOFT > SERVER',
    'PHILIPS >',
    'PHONES >',
    'PROCESSORS >',
    'UPS > ACCESSORIES',
    'MOUSE > GAMING',
    'MOUSE > ACCESSORIES',
    'MEMORY > MEMORY'
    // /mouse > $/giu
  ]

  let preFiltered = products.filter((product) => {
    const emptyOfSubcategories =
      (product.category_description == 'SOUND' && product.group_description == '') ||
      (product.category_description == 'MOUSE' && product.group_description == '')
    return !emptyOfSubcategories
  })

  const filteredArray = preFiltered.filter((product) => {
    if (product.combinedCategories) {
      const categories = product.combinedCategories
      return !unwantedSubstrings.some((substring) => categories.includes(substring))
    } else {
      return false
    }
  })

  return filteredArray
}

function tidyFields(products) {
  return products.map(
    ({
      sku,
      name,
      retail_price: price,
      recommended_margin,
      cpt_stock: cptStock,
      jhb_stock: jhbStock,
      weight,
      length,
      width,
      height,
      all_images: images,
      categorytree: categories,
      description
    }) => ({
      sku,
      name,
      price,
      categories,
      description,
      recommended_margin,
      weight,
      length,
      width,
      height,
      images,
      cptStock,
      jhbStock,
      stock: cptStock + jhbStock,
      type: 'simple'
    })
  )
}

function combineCategoriesField(products) {
  // Merge the two columns into one with the same '>' separator as symtech stock.
  return products.map((product) => {
    const combinedCategories = `${product.category_description} > ${product.group_description}`
    return { ...product, combinedCategories }
  })
}

function fixAllImagesField(products) {
  return products.map((product) => {
    const updatedAllImages = product.all_images?.replace(/ \|\s*/g, ',')
    return { ...product, all_images: updatedAllImages }
  })
}
