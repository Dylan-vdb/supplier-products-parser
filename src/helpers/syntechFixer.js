export function processSyntechStock(xmlData) {
  const products = xmlData.syntechstock.stock.product
  const cleanedProducts = removeDuplicates(products)
  const filteredProducts = removeUnwantedCategories(cleanedProducts)
  const fixedImages = fixAllImagesField(filteredProducts)
  const categorizedProducts = improveCategoryNames(fixedImages)
  const combinedStocks = combineStocksField(categorizedProducts)
  return tidyFields(combinedStocks)
}

function tidyFields(products) {
  return products.map(
    ({
      sku,
      name,
      rrp_incl: price,
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
      cptstock,
      jhbstock,
      stock,
      type: 'simple'
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
      .replace('Heating, Cooling, and Air Quality', 'Heating Cooling and Air Quality')
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
      .replace(
        'Accessories > Media and Streaming > Adapters and Converters',
        'Peripherals > Adapters > Display Adapters'
      )

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
    'On Promotion',
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
  const filteredArray = arr.filter((obj) => {
    if (obj.categories) {
      const categories = obj.categorytree.toUpperCase()
      return !unwantedSubstrings.some((substring) => categories.includes(substring.toUpperCase()))
    } else {
      return false
    }
  })
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
