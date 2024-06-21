export function processMicropointStock(xmlData) {
  const products = xmlData.xml_data.items.item
  const combinedCategories = combineCategoriesField(products)
  const categoriesRemoved = removeUnwantedCategories(combinedCategories)
  const combinedStocks = improveCategoryNames(categoriesRemoved)

  // const filteredProducts = removeUnwantedCategories(products)
  // const fixedImages = fixAllImagesField(filteredProducts)
  // const categorizedProducts = improveCategoryNames(fixedImages)
  // const combinedStocks = combineStocksField(categorizedProducts)
  // return tidyFields(combinedStocks)
  return combinedStocks
}

function improveCategoryNames(products) {
  return products.reduce((updatedProducts, product) => {
    const updatedCategoryTree = product.combinedCategories
      // ADAPTERS > becomes Peripherals > Adapters > [micropoint subcategory]
      .replace('ADAPTERS >', `Peripherals > Adapters >`)
      //  ADD-ON CARDS  -->  Components > Expansion and PCIe Adapters
      .replace('ADD-ON CARDS >', 'Components > Expansion and PCIe Adapters >')

      // ANCILLARY ITEMS  -->  Gadgets > [micropoint subcategory]
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
      /**
  MEMORY	   DESKTOP MEMORY   --->     Components > Memory > Desktop Memory
	MEMORY	FLASH DRIVES   --->          Components > Memory > Flash Drives
  MEMORY	GAMING             ---->     Components > Memory > Gaming Memory
 	MEMORY	MICRO SD	--->         Components > Memory > Micro SD
	MEMORY	NOTEBOOK MEMORY   ---->      Components > Memory > Notebook Memory

       */

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
      .replace('MOUSE > USB', 'Peripherals > Mice > Gaming Mice')
      .replace('MOUSE > WIRED MOUSE', 'Peripherals > Mice > Office Mice')
      .replace('MOUSE > WIRELESS MOUSE', 'Peripherals > Mice > Office Mice')

      .replace('NETBOOKS > INTEL CELERON', 'Notebooks')
      .replace('NOTEBOOKS > ACCESSORIES', 'Accessories > Notebook Accessories')
      .replace('NOTEBOOK BAGS > SLEEVE', 'Accessories > Bags and Covers > Sleeves')
      .replace('NOTEBOOK BAGS > TABLET  SLEEVES', 'Accessories > Bags and Covers > Sleeves')
      .replace(/^NOTEBOOK ACCESSORIES >.*/giu, 'Accessories > Notebook Accessories')
      .replace(/^NOTEBOOK BAGS >\s*\S.*$/giu, 'Accessories > Bags and Covers > Bags')
      .replace(/^NOTEBOOKS >\s*\S.*$/giu, 'Notebooks')

      .replace('NETWORKING > 3G / LTE DEVICES', 'Networking & Security > Portable Routers')
      .replace('NETWORKING > ACCESSORIES', 'Networking & Security > Accessories')
      .replace('NETWORKING > CONSUMABLES', 'Networking & Security > Consumables')
      .replace('NETWORKING > ROUTERS', 'Networking & Security > Routers and Mesh')
      .replace('NETWORKING > SWITCHES', 'Networking & Security > Switches')

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

    updatedProducts.push({ ...product, categorytree: updatedCategoryTree })
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
    'MOUSE > ACCESSORIES'
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
