export function processMicropointStock(xmlData) {
  const products = xmlData.xml_data.items.item
  const combinedCategories = combineCategoriesField(products)
  const combinedStocks = removeUnwantedCategories(combinedCategories)

  // const filteredProducts = removeUnwantedCategories(products)
  // const fixedImages = fixAllImagesField(filteredProducts)
  // const categorizedProducts = improveCategoryNames(fixedImages)
  // const combinedStocks = combineStocksField(categorizedProducts)
  // return tidyFields(combinedStocks)
  return combinedStocks
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
    'SOLID STATE DRIVE > ACCESSORIES',
    'TOOLS >',
    'TP-LINK >',
    'TRANSMITTERS >',
    'TV >',
    'WARRANTY >'
  ]

  let preFiltered = products.filter((product) => {
    const soundHasNoSubcategories =
      product.category_description == 'SOUND' && product.group_description == ''
    return !soundHasNoSubcategories
  })

  const filteredArray = preFiltered.filter((product) => {
    if (product.category) {
      const categories = product.category.toUpperCase()
      return !unwantedSubstrings.some((substring) => categories.includes(substring.toUpperCase()))
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
    return { ...product, category: combinedCategories }
  })
}

function improveCategoryNames(products) {
  return products.map((product) => {
    const updatedCategoryTree = product.categorytree
      // .replace(
      //   /Components >/g,
      //   'Computer Components >'
      // )
      .replace('Computers & Peripherals', 'Peripherals')
      .replace('Consumer Electronics > ', 'Accessories > ')
      .replace('Peripherals > Desktop Computers > Gaming Desktops', 'Computers > Gaming Desktops')
      .replace('Peripherals > Desktop Computers > Office Desktops', 'Computers > Office Desktops')
      .replace('Peripherals > Mini PCs > Barebone Systems', 'Mini PCs > Barebone Systems')
      .replace('Peripherals > Mini PCs > Complete Systems', 'Mini PCs > Complete Systems')
      .replace('Peripherals > Mousepads', 'Accessories > Mousepads')
      .replace('Peripherals > Stands and Cooling', 'Accessories > Stands and Cooling')
      .replace('Accessories > Bags and Covers', 'Accessories > Bags and Covers')
      .replace('Appliances > ', 'Gadgets > ')
      .replace(
        'Peripherals > Computer Audio > Headsets',
        'Peripherals > Computer Audio > Headsets > Over-Ears'
      )

      // Accessories > Speakers > Bluetooth Speakers

      .replace('Accessories > Headphones > ', 'Peripherals > Computer Audio > Headsets > ')
      .replace('Accessories > Lighting', 'Gadgets > Lighting')
      .replace('Accessories > Portable Printing > Printers', 'Printers > Portable Printers')
      .replace(
        'Accessories > Portable Printing > Printing Consumables',
        'Printers > Portable Printers > Consumables'
      )

      .replace('Accessories > Speakers', 'Peripherals > Computer Audio > Speakers') // Double check this
    return { ...product, categorytree: updatedCategoryTree }
  })
}

function fixAllImagesField(products) {
  return products.map((product) => {
    const updatedAllImages = product.all_images?.replace(/ \|\s*/g, ',')
    return { ...product, all_images: updatedAllImages }
  })
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
