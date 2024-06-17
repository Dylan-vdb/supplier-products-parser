<template>
  <div class="dropzone">
    <div class="dropzone__inner" ref="dropzoneRef">
      <p>Drop your XML file here</p>
      <div v-if="isDragActive">
        <p>Drop the file to start parsing</p>
      </div>
      <div v-else>
        <p>Drag and drop your XML file here</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect, onMounted } from 'vue'
import { useDropZone } from '@vueuse/core'
import { XMLParser } from 'fast-xml-parser'
import Papa from 'papaparse'

export default {
  setup() {
    const dropzoneRef = ref(null)
    const filesData = ref([])
    const { isOverDropZone } = useDropZone(dropzoneRef, onDrop)
    const syntechData = ref([])

    // onMounted(() => {
    //   const filtered = textToFilter.replaceAll(`â€”`, ' ') // .replaceAll(`€`, '').replaceAll(`”`, '')

    // })

    async function onDrop(files) {
      parseXml(files[0])
    }

    function parseXml(xmlFile) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const xmlRaw = event.target.result
        const xmlNoSymbols = removeSymbols(xmlRaw)
        const parser = new XMLParser()
        const parsedXml = parser.parse(xmlNoSymbols)
        if (xmlFile.name.includes('syntech')) processSyntechStock(parsedXml)
        if (xmlFile.name.includes('micropoint')) processMicropointStock(parsedXml)
      }
      reader.readAsText(xmlFile)
    }

    function removeSymbols(text) {
      const filtered = text
        .replaceAll(`â€”`, ' ')
        .replaceAll('™', '') // Success
        .replaceAll('“', '') // Success
        .replaceAll('”', '') // Success
        .replaceAll('®', '') // Success
        .replaceAll('©', '') // Success
        .replaceAll('⎓', '') // Success
        .replaceAll('.', '.')
        .replaceAll(/\u2024/giu, '.')
        .replaceAll(/\u2025/giu, '.')
        .replaceAll(/\u2019/giu, "'") // Success
        .replaceAll(/\u2013/giu, '-') // Success
        .replaceAll('≤', 'less than or equal to') // Success
        .replaceAll('≥', 'greater than or equal to') // Success
        .replaceAll('≦', 'less than or equal to') // Success
        .replaceAll('≧', 'greater than or equal to') // Success
        .replaceAll(/Â/giu, '')
        .replaceAll(/\u00a0/giu, ' ')
        .replaceAll(/\u00e2/giu, '')
        .replaceAll('€', '')
        .replaceAll('â', '')
        .replaceAll('ª', '')
        .replaceAll('ª', '')
        .replaceAll('℃', ' degC') // Success
      return filtered
    }

    function processSyntechStock(parsedXml) {
      const xmlData = parsedXml.syntechstock.stock.product
      const deduplicated = removeDuplicates(xmlData)
      const desiredCategories = removeUnwantedCategories(deduplicated)
      const fixedAllImagesField = fixAllImagesField(desiredCategories)
      // const removedAllUnusualSymbols = removeUnusualSymbols(fixedAllImagesField)
      const improvedCategoryNames = improveCategoryNames(fixedAllImagesField)
      // const improvedCategoryNames = fixedAllImagesField
      const combinedStocksField = combineStocksField(improvedCategoryNames)
      const finalizedFields = tidyFields(combinedStocksField)
      outPutCsv(finalizedFields)
    }

    function processMicropointStock(rawXml) {
      const parser = new XMLParser()
      const parsedXml = parser.parse(rawXml)
      const xmlData = parsedXml.xml_data.items.item
      debugger
      // There are no duplicates in micropoint table

      // const deduplicated = removeDuplicates(xmlData)
      // const desiredCategories = removeUnwantedCategories(deduplicated)

      // const fixedAllImagesField = fixAllImagesField(desiredCategories)
      // // const removedAllUnusualSymbols = removeUnusualSymbols(fixedAllImagesField)
      // const improvedCategoryNames = improveCategoryNames(fixedAllImagesField)
      // const combinedStocksField = combineStocksField(improvedCategoryNames)
      // const finalizedFields = tidyFields(combinedStocksField)
      outPutCsv(xmlData)
    }

    function outPutCsv(data) {
      const csvRaw = Papa.unparse(data, {
        delimiter: ';',
        quoteChars: '""'
        // escapeChar: ''
      })

      const csvRawDesymboled = csvRaw
        .replaceAll(/all\D\D\Wand more/giu, 'all and more')
        .replaceAll('â€”', ' ')
        .replaceAll('Â', '')
        .replaceAll(/Â/giu, '')
        .replaceAll(/\u00a0/giu, ' ')
        .replaceAll(/\u00e2/giu, '')

      // console.log('csvRaw: ', csvRaw)
      // console.log('csvRawDesymboled: ', csvRawDesymboled)

      const object = Papa.parse(csvRawDesymboled, { header: true }).data

      // const newObject = removeUnusualSymbols(object)
      const csv = Papa.unparse(object, {
        delimiter: ';',
        quoteChars: '""'
        // escapeChar: ''
      })

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'computer-gadgets-woocommerce-products.csv'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    function tidyFields(products) {
      return products.map((obj) => {
        const {
          sku,
          name,
          rrp_incl,
          recommended_margin,
          cptstock,
          jhbstock,
          weight,
          length,
          width,
          height,
          all_images,
          categorytree,
          description
        } = obj
        const stock = cptstock + jhbstock
        const price = rrp_incl
        const images = all_images
        const categories = categorytree
        const type = 'simple' // Add the new field

        return {
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
          type
        }
      })
    }

    function combineStocksField(products) {
      return products.map((obj) => {
        const stock = obj.cptstock + obj.jhbstock
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
          .replace(
            'Peripherals > Desktop Computers > Gaming Desktops',
            'Computers > Gaming Desktops'
          )
          .replace(
            'Peripherals > Desktop Computers > Office Desktops',
            'Computers > Office Desktops'
          )
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
          return !unwantedSubstrings.some((substring) =>
            categories.includes(substring.toUpperCase())
          )
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

    return {
      dropzoneRef
    }
  }
}
</script>

<style scoped>
.dropzone {
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.dropzone__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.dropzone__inner p {
  margin: 0;
}

.dropzone__inner p:first-child {
  font-size: 16px;
  font-weight: bold;
}

.dropzone__inner p:last-child {
  font-size: 14px;
  color: #999;
}

/* .dropzone__inner div  */
</style>
