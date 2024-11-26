import { featuredCategories } from './constants'

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
    let existingSkus = JSON.parse(existingListString)
    let discontinuedSkus = existingSkus.filter((sku) => !skuList.includes(sku))
    discontinuedSkus.forEach((sku) => {
      products.push({
        sku: sku,
        stock: 0,
        published: 0,
        'Visibility in catalog': 'hidden'
      })
    })
    localStorage.setItem(`${supplier}SkuListOld`, existingListString)
  }
  localStorage.setItem(`${supplier}SkuListNew`, JSON.stringify(skuList))
  return products
}

export function refineFeaturedItems(products) {
  return products.map((product) => {
    const updatedProduct = { ...product };
    
    // Only check categories if the product was previously featured
    if (product.is_featured === 1) {
      // Check if any of the product's categories include any of the featured categories
      const isFeatured = featuredCategories.some(featuredCategory => 
        product.categories.includes(featuredCategory)
      );
      
      // Only update is_featured if the categories don't match (un-featuring the product)
      if (!isFeatured) {
        updatedProduct.is_featured = 0;
      }
    }
    
    return updatedProduct;
  });
}

export function refineCategories(products) {
  // const allCategories = new Set(
  //   products
  //     .map((product) => product.categories)
  //     .flat()
  //     .sort()
  // )

  let result = products.reduce((acc, product) => {
    const updatedProduct = { ...product }

    if (product.categories.includes('Mice')) {
      updatedProduct.categories = product.categories.replaceAll('Mice', 'Mouses')
      if (updatedProduct.categories.includes('Mouses > Gaming Mouses')) {
        updatedProduct.categories = `Gaming > Mouses,${updatedProduct.categories}`
      }
    }

    if (
      product.categories.includes('Accessories > Notebook Accessories') &&
      product.description.toLowerCase().includes('charger')
    ) {
      updatedProduct.categories = 'Power Solutions > Notebook Chargers'
    }

    if (updatedProduct.categories.includes('Accessories > Notebook Accessories')) {
      updatedProduct.categories = updatedProduct.categories.replace(
        'Accessories > Notebook Accessories',
        'Notebook Accessories'
      )
    }

    if (product.categories.includes('Components > Power Supplies')) {
      updatedProduct.categories = `${product.categories.replace(
        'Components > Power Supplies',
        'Power Solutions > Computer Power Supplies'
      )},${product.categories}`
    }

    if (
      product.categories.includes('Peripherals > Notebook Chargers') ||
      product.categories.includes('Components > Notebook Chargers')
    ) {
      updatedProduct.categories = 'Power Solutions > Notebook Chargers'
    }

    if (product.categories.includes('Components > Notebook Batteries')) {
      updatedProduct.categories =
        'Notebook Components > Batteries,Power Solutions > Notebook Batteries'
    }

    if (product.categories.includes('Convertors >')) {
      updatedProduct.categories = 'Connectors Adaptors & Converters'
    }

    if (
      product.categories.includes('Peripherals > Adapters') ||
      product.categories.includes('Peripherals > Adapters & Converters')
    ) {
      updatedProduct.categories = 'Connectors Adaptors & Converters'
    }

    if (product.categories.includes('Components > Internal Brackets and Adapters')) {
      updatedProduct.categories = 'Connectors Adaptors & Converters'
    }

    //  || product.sku == 'T55'
    if (product.categories.includes('Accessories > Bags And Covers')) {
      updatedProduct.categories = product.categories.replace(
        'Accessories > Bags And Covers',
        'Bags Cases & Covers'
      )
    }

    if (product.categories.includes('Accessories > Bags and Covers')) {
      updatedProduct.categories = product.categories.replace(
        'Accessories > Bags and Covers',
        'Bags Cases & Covers'
      )
    }

    if (product.categories.includes('Accessories > Wearables')) {
      updatedProduct.categories = 'Gadgets > Wearables'
    }

    if (product.categories.includes('Components > Apple')) {
      updatedProduct.categories = 'Apple > Apple Accessories'
    }

    if (product.categories.includes('Components > Cooling > Thermal Paste')) {
      updatedProduct.categories = 'Accessories > Consumables'
    }

    if (product.categories.includes('Cooling > Case Fans')) {
      updatedProduct.categories = product.categories.replace('Case Fans', 'Fans')
    }

    if (product.categories.includes('Memory > Apple Memory')) {
      updatedProduct.categories = `Apple > Memory,${product.categories}`
    }

    if (product.categories.includes('Components > Hard Drives')) {
      updatedProduct.categories = `Components > Storage Media > Hard Drives`
    }

    if (product.categories.includes('Memory > Micro Sd')) {
      updatedProduct.categories = `Components > Storage Media > Micro SD`
    }

    if (product.categories.includes('Memory > Enclosures')) {
      updatedProduct.categories = `Components > Storage Media > Enclosures`
    }

    if (product.categories.includes('Memory > Flash Drives')) {
      updatedProduct.categories = `Components > Storage Media > Flash Drives`
    }

    if (product.categories.includes('Components > Disk Drives')) {
      updatedProduct.categories = `Components > Storage Media > Hard Drives`
    }

    if (product.categories.includes('Components > Solid State Drives')) {
      updatedProduct.categories = `Components > Storage Media > Solid State Drives`
      if (product.name.toLowerCase().includes(' nvme ')) {
        updatedProduct.categories = `Components > Storage Media > Solid State NVMe Drives`
      }
    }

    if (product.categories.includes('Peripherals > Storage > Adapters & Docks')) {
      updatedProduct.categories = `Connectors Adaptors & Converters`
    }

    if (product.categories.includes('Peripherals > Storage > Enclosures')) {
      updatedProduct.categories = `Components > Storage Media > Enclosures`
    }

    if (product.categories.includes('Peripherals > Storage > External SSDs')) {
      updatedProduct.categories = `Components > Storage Media > External SSDs`
    }

    if (product.categories.includes('Peripherals > Storage > Flash Drives')) {
      updatedProduct.categories = `Components > Storage Media > Flash Drives`
    }

    if (product.categories.includes('Peripherals > Storage > Memory Cards')) {
      updatedProduct.categories = `Components > Storage Media > Micro SD`
    }

    // End of Storage fixes

    if (product.categories.includes('Accessories > Media and Streaming')) {
      updatedProduct.categories = product.categories.replace('Accessories', 'Gadgets')
    }

    if (product.categories.includes('Components > Chassis')) {
      updatedProduct.categories = product.categories.replaceAll('Chassis', 'PC Cases')
    }

    if (product.categories.includes('Components > Motherboards > Socket 1200')) {
      updatedProduct.categories = 'Components > Motherboards > Socket 1200 Motherboards'
    }

    if (product.categories.includes('Peripherals > Cables')) {
      updatedProduct.categories = product.categories.replace('Peripherals > Cables', 'Cables')
      if (updatedProduct.categories.includes('Cables > Cables' || 'Cables > Accessories')) {
        updatedProduct.categories = 'Cables'
      }
    }

    if (product.categories.includes('Peripherals > Cable Locks')) {
      updatedProduct.categories = 'Cables > Cable Locks'
    }

    if (product.categories.includes('Components > Software')) {
      updatedProduct.categories = 'Software'
    }

    // GAMING START
    if (product.categories.includes('Components > Graphics Cards > Gaming')) {
      updatedProduct.categories = `Gaming > Graphics Cards,${product.categories}`
    }

    if (product.categories.includes('Components > Memory > Gaming Memory')) {
      updatedProduct.categories = `Gaming > Desktop Memory,${product.categories}`
    }

    if (product.categories.includes('Components > PC Cases > Gaming PC Cases')) {
      updatedProduct.categories = `Gaming > PC Cases,${product.categories}`
    }

    if (product.categories.includes('Computers > Gaming Desktops')) {
      updatedProduct.categories = `Gaming > Desktops,${product.categories}`
    }

    if (product.categories.includes('Notebooks > Gaming Notebooks')) {
      updatedProduct.categories = `Gaming > Notebooks,${product.categories}`
    }

    if (product.categories.includes('Peripherals > Gaming')) {
      updatedProduct.categories = `Gaming > Controllers,${product.categories}`
    }

    if (product.categories.includes('Gadgets > Gaming')) {
      updatedProduct.categories = `Gaming > Retro,${product.categories}`
    }

    if (product.categories.includes('Peripherals > Gaming Controllers')) {
      updatedProduct.categories = `Gaming > Gaming Controllers,Peripherals > Gaming`
    }

    if (product.categories.includes('Peripherals > Keyboards > Gaming Keyboards')) {
      updatedProduct.categories = `Gaming > Keyboards,${product.categories}`
    }

    if (product.categories.includes('Peripherals > Monitors > Gaming Monitors')) {
      updatedProduct.categories = `Gaming > Monitors,${product.categories}`
    }

    if (product.categories.includes('Peripherals > Chairs')) {
      updatedProduct.categories = 'Gaming > Chairs'
    }
    // GAMING END

    if (product.categories.includes('Peripherals > Keyboards > Office Keyboard')) {
      updatedProduct.categories = 'Peripherals > Keyboards > Office Keyboards'
    }

    if (product.categories.includes('Gaming > 2.5" SSD')) {
      updatedProduct.categories = 'Gaming > Solid State Drives'
    }

    if (product.categories.startsWith('Networking') 
      && !product.categories.includes('Networking and Wifi')
      && !product.categories.includes('Networking & Wifi')
    ) {
      updatedProduct.categories = product.categories.replace('Networking', 'Networking and Wifi')

      if (updatedProduct.categories.includes('Networking and Wifi > Routers And Mesh')) {
        updatedProduct.categories = 'Networking and Wifi > Routers and Mesh'
      }
    }

    if (product.categories.includes('Cables > Media Cables')) {
      updatedProduct.categories = 'Cables > Media'
    }
    // Normal Plug Power Cables
    if (product.categories.includes('Cables > Normal Plug Power Cables')) {
      updatedProduct.categories = 'Cables > Power > Normal Plug Power Cables'
    }

    if (product.categories.includes('Cables > Other Power Cables')) {
      updatedProduct.categories = 'Cables > Power > Other Power Cables'
    }

    if (product.categories.includes('Cables > RCA')) {
      updatedProduct.categories = 'Cables > RCA Cables'
    }

    if (
      product.categories.includes(
        'Cables > USB' ||
          'Cables > USB 3.0 Cables' ||
          'Cables > USB Charging And Data Cables' ||
          'Cables > USB Type C'
      )
    ) {
      updatedProduct.categories = 'Cables > USB Cables'
    }

    if (product.categories.endsWith('Cables > VGA')) {
      updatedProduct.categories = `Connectors Adaptors & Converters,Cables > VGA Cable Converters`
    }

    if (product.categories.includes('Components > Memory > Notebook Memory')) {
      updatedProduct.categories = 'Notebook Components > Memory'
    }

    if (product.categories.includes('Components > Notebook Keyboards')) {
      updatedProduct.categories = 'Notebook Components > Keyboards'
    }

    if (product.categories.includes('Components > Notebook Screens')) {
      updatedProduct.categories = 'Notebook Components > Screens'
    }

    if (product.categories.includes('Power Solutions > Notebook Chargers')) {
      updatedProduct.categories = `Notebook Components > Chargers,${product.categories}`
    }

    updatedProduct.categories = updatedProduct.categories.replaceAll(' and ', ' & ')
    updatedProduct.categories = updatedProduct.categories.replaceAll(' And ', ' & ')

    acc.push(updatedProduct)
    return acc
  }, [])
  // Next round of fixes

  result = result.reduce((acc, product) => {
    const updatedProduct = { ...product }

    if (
      product.categories.includes('Components >') &&
      !product.categories.includes('Notebook Components') &&
      !product.categories.includes('Desktop Components')
    ) {
      updatedProduct.categories = product.categories.replace('Components >', 'Desktop Components >')
      if (updatedProduct.categories.includes('Desktop Components > Storage Media')) {
        updatedProduct.categories = updatedProduct.categories.replace(
          'Desktop Components > Storage Media',
          'Storage Media'
        )
      }
    }

    if (
      product.categories.includes('Computers >') &&
      !product.categories.includes('Desktop Computers >')
    ) {
      updatedProduct.categories = product.categories.replace('Computers >', 'Desktop Computers >')
    }

    acc.push(updatedProduct)
    return acc
  }, [])

  result = result
    .reduce((acc, product) => {
      if (
        product.categories.includes('Notebook Accessories') &&
        product.name.toLowerCase().includes('pin accessory')
      ) {
        return acc
      }

      if (product.categories.includes('Cables > LDINO')) {
        return acc
      }

      if (product.categories.includes('Desktop Components > Graphics Cards > AMD Processors')) {
        return acc
      }

      const updatedProduct = { ...product }

      if (product.categories.includes('Cables > Network > Antenna')) {
        updatedProduct.categories = 'Networking & Wifi > Antenna Cables'
      }

      if (product.categories.includes('Cables > Antenna')) {
        updatedProduct.categories = 'Cables > Antenna Cables'
      }

      if (product.categories.includes('Cables > Network > CAT 5 Cables')) {
        updatedProduct.categories = 'Networking & Wifi > CAT 5 Cables'
      }

      if (product.categories.includes('Cables > Network > Cat6 Cables')) {
        updatedProduct.categories = 'Networking & Wifi > CAT 6 Cables'
      }

      if (product.categories.includes('Cables > Network > Display Port Cables')) {
        updatedProduct.categories = 'Cables > DVI Cable'
      }

      if (product.categories.includes('Cables > Network > Fibre')) {
        updatedProduct.categories = 'Networking & Wifi > Fibre Cables'
      }

      if (product.categories.includes('Cables > Fibre')) {
        updatedProduct.categories = 'Cables > Fibre Cables'
      }

      if (product.categories.includes('Cables > Network > Patch Cables')) {
        updatedProduct.categories = 'Networking & Wifi > Patch Cables'
      }

      if (product.categories.includes('Cables > Cat6 Cables')) {
        updatedProduct.categories = 'Networking & Wifi > CAT 6 Cables'
      }

      if (product.categories.includes('Cables > Cable Locks')) {
        updatedProduct.categories = 'Notebook Components > Locks'
      }

      if (product.categories.includes('Cables > Apple')) {
        updatedProduct.categories = 'Apple > Cables'
      }

      if (product.categories.includes('Cables > Media > Accessories')) {
        updatedProduct.categories = 'Connectors Adaptors & Converters'
      }

      if (product.categories.includes('Cables > Media > Cables')) {
        if (product.name.includes('HDMI')) {
          updatedProduct.categories = 'Cables > HDMI Cables'
        } else {
          updatedProduct.categories = 'Cables > Media'
        }
      }

      if (product.categories.includes('Cables > Media > VGA Cable Converters')) {
        updatedProduct.categories = `Connectors Adaptors & Converters,Cables > VGA Cable Converters`
      }

      if (product.categories.includes('Cables > Media > HDMI')) {
        updatedProduct.categories = 'Cables > Media > HDMI Cables'
      }

      if (product.categories.includes('Cables > Media > Mini Display Port')) {
        updatedProduct.categories = 'Cables > Media > Mini Display Port Cables'
      }

      if (product.categories.includes('Cables > Media > VGA')) {
        updatedProduct.categories = 'Cables > Media > VGA Cables'
      }

      if (product.categories.includes('Cables > Mining')) {
        updatedProduct.categories = 'Cables > Mining Cables'
      }

      if (product.categories.includes('Cables > Molex')) {
        updatedProduct.categories = 'Cables > Molex Cables'
      }

      if (product.categories.includes('Cables > Optical')) {
        updatedProduct.categories = 'Cables > Optical Cables'
      }

      if (product.categories.includes('Cables > RJ11')) {
        updatedProduct.categories = 'Cables > RJ11 Cables'
      }

      if (product.categories.includes('Cables > Serial')) {
        updatedProduct.categories = 'Cables > Serial Cables'
      }

      if (product.categories.includes('Cables > Power')) {
        updatedProduct.categories = `Power Solutions > Power Cables,${product.categories}`
      }

      if (product.categories.includes('Accessories > Stands & Cooling')) {
        if (
          product.name.toLowerCase().includes('notebook') ||
          product.name.toLowerCase().includes('laptop')
        ) {
          updatedProduct.categories = 'Notebook Components > Stands & Cooling'
        } else {
          updatedProduct.categories = 'Accessories > Desktop Stands'
        }
      }

      if (product.categories.includes('Gadgets > 27 Inch')) {
        updatedProduct.categories = `Notebook Components > Screen Protectors, Peripherals > Screen Protectors`
      }

      if (product.categories.includes('Notebook Accessories')) {
        if (
          product.name.toLowerCase().includes('cooler') ||
          product.name.toLowerCase().includes('cooling') ||
          product.name.toLowerCase().includes('notebook tray') ||
          product.name.toLowerCase().includes('notebook stand')
        ) {
          updatedProduct.categories = 'Notebook Components > Stands & Cooling'
        }

        if (
          product.categories.includes('> Notebook Locks') ||
          product.name.toLowerCase().includes('lock')
        ) {
          updatedProduct.categories = 'Notebook Components > Locks'
        }

        if (product.name.toLowerCase().includes('sticker')) {
          updatedProduct.categories = 'Notebook Components > Stickers'
        }

        if (product.name.toLowerCase().includes('mouse pad')) {
          updatedProduct.categories = 'Accessories > Mousepads'
        }

        if (product.name.toLowerCase().includes('travel kit')) {
          updatedProduct.categories = 'Notebook Components > Travel Kits'
        }

        if (product.name.toLowerCase().includes('usb replicator')) {
          updatedProduct.categories = 'Connectors Adaptors & Converters'
        }

        if (product.name.toLowerCase().includes('powerbank')) {
          updatedProduct.categories =
            'Power Solutions > Power Banks,Notebook Components > Power Banks'
        }

        if (product.name.toLowerCase().includes('screen protector')) {
          updatedProduct.categories =
            'Notebook Components > Screen Protectors, Peripherals > Screen Protectors'
        }

        if (product.name.toUpperCase().includes('60MM FANS')) {
          updatedProduct.categories = 'Notebook Components > Stands & Cooling'
        }
      }

      acc.push(updatedProduct)
      return acc
    }, [])
    .reduce((acc, product) => {
      const updatedProduct = { ...product }

      if (
        product.categories.includes(
          'Cables > Media' && !product.categories.includes('Cables > Media Cables')
        )
      ) {
        updatedProduct.categories = product.categories.replace(
          'Cables > Media',
          'Cables > Media Cables'
        )
      }

      if (
        product.categories.includes(
          'Cables > Power' && !product.categories.includes('Cables > Power Cables')
        )
      ) {
        updatedProduct.categories = product.categories.replace(
          'Cables > Power',
          'Cables > Power Cables'
        )
      }

      if (product.categories.includes('Dash Cameras')) {
        updatedProduct.categories = 'Gadgets > Dash Cameras'
      }

      if (product.categories.includes('Gadgets > CPU Fans')) {
        updatedProduct.categories = 'Desktop Components > Cooling > CPU Cooling'
      }

      if (product.categories.toLowerCase().includes('desktop components > pc cases')) {
        updatedProduct.categories = product.categories.replaceAll(/pc cases/gi, 'Desktop Cases')
      }

      if (product.categories.toLowerCase().includes(`cd's & dvd's`)) {
        updatedProduct.categories = product.categories.replaceAll(/cd's & dvd's/gi, `CD's & DVD's`)
      }

      if (product.categories.toLowerCase().includes('storage media > external ssds')) {
        updatedProduct.categories = product.categories.replaceAll(
          /external ssds/gi,
          'External SSDs'
        )
      }

      if (product.categories.includes('Peripherals > Switches')) {
        updatedProduct.categories = 'Peripherals > Switches'
      }

      if (product.categories.includes('Accessories >')) {
        const regex = /^(?:Accessories\s*>\s*[^,>]+|[^,>]+\s*>\s*[^,>]+,Accessories\s*>\s*[^,>]+)$/
        if (regex.test(product.categories)) {
          updatedProduct.categories = product.categories.replace('Accessories >', 'Peripherals >')
        }
      }

      if (product.categories.includes('Printers > Toner Cartridges')) {
        updatedProduct.categories = 'Printers > Cartridges > Toner Cartridges'
      }

      acc.push(updatedProduct)
      return acc
    }, [])

  const oldCategories = JSON.parse(localStorage.getItem('categories')) ?? []
  const categoriesSet = new Set(result.map((product) => product.categories).sort())
  const newCategories = new Set([...oldCategories, ...categoriesSet])
  localStorage.setItem('categories', JSON.stringify([...newCategories]))

  return result
}
