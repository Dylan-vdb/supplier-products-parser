<template>
  <div class="app-wrapper">
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
    <button @click="pullCategories">Pull Categories</button>
    <br />
    <button @click="processEsquire">PROCESS ESQUIRE</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDropZone } from '@vueuse/core'
import { XMLParser } from 'fast-xml-parser'
import Papa from 'papaparse'

import { processSyntechStock } from './helpers/syntechFixer'
import { processMicropointStock } from './helpers/micropointFixer'
import { processFrontosaStock } from './helpers/frontosaFixer'
import { processAstrumStock } from './helpers/astrumFixer'
import { processEsquireStock } from './helpers/esquireFixer'
import { processEsquireExtras } from './helpers/esquireExtrasFixer'

import { processDiscontinuedStock } from './helpers/discontinuedStockFixer'
import { symbolMap } from './helpers/constants'
import {
  handleLowStocks,
  adjustAdaptersAndConnectorsPricing,
  adjustCablesPricing,
  refineCategories,
  refineFeaturedItems
} from './helpers/baseHelpers'

const dropzoneRef = ref(null)
const { isDragActive } = useDropZone(dropzoneRef, onDrop)
const syntechData = ref([])
const micropointData = ref([])
const frontosaData = ref([])
const astrumData = ref([])
const esquireData = ref([])
const discontinuedStock = ref([])

const DIY = 'DIY Hardware & Tools'
const LIFESTYLE = 'Lifestyle & Appliances'
const STATIONERY = 'Stationery'

async function onDrop(files) {
  const file = files[0]
  if (file.name.includes('Astrum')) {
    const rawData = await Promise.all(files.map((file) => parseCsv(file)))
    astrumData.value = processAstrumStock(rawData)
    outPutCsv(astrumData.value)
    return
  }
  if (file.name.includes('Frontosa')) {
    const rawData = await parseCsv(file)
    frontosaData.value = processFrontosaStock(rawData.result.data)
    outPutCsv(frontosaData.value)
    return
  }
  if (file.name.includes('wc-product-export')) {
    const rawData = await parseCsv(file)
    discontinuedStock.value = processDiscontinuedStock(rawData.result.data)
    outPutCsv(discontinuedStock.value)
    return
  }

  if (file.type == 'text/csv') {
    parseCsv(file)
  } else {
    parseXml(file)
  }
}

function parseCsv(csvFile) {
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      complete: (results) => {
        resolve({ name: csvFile.name, result: results })
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}

function processEsquire() {
  esquireData.value = processEsquireStock()
  const refinedData = furtherRefinements(esquireData.value)
  outPutCsv(refinedData)
}

function parseXml(xmlFile) {
  const reader = new FileReader()
  reader.onload = async (event) => {
    const xmlRaw = event.target.result
    const parser = new XMLParser()
    const parsedXml = parser.parse(xmlRaw)

    if (xmlFile.name.includes('micropoint')) {
      micropointData.value = processMicropointStock(parsedXml)
      const refinedData = furtherRefinements(micropointData.value)
      outPutCsv(refinedData)
    }

    if (xmlFile.name.includes('syntech')) {
      syntechData.value = processSyntechStock(parsedXml)
      const refinedData = furtherRefinements(syntechData.value)
      outPutCsv(refinedData)
    }

    if (xmlFile.name.includes('Hardware')) {
      const hardwareTools = processEsquireExtras(parsedXml, DIY)
      outPutCsv(hardwareTools)
      return
    }

    if (xmlFile.name.includes('Lifestyle')) {
      const lifestyleData = processEsquireExtras(parsedXml, LIFESTYLE)
      outPutCsv(lifestyleData)
      return
    }

    if (xmlFile.name.includes('Stationery')) {
      const stationeryData = processEsquireExtras(parsedXml, STATIONERY)
      outPutCsv(stationeryData)
      return
    }
  }
  reader.readAsText(xmlFile)
}

function removeSymbols(text) {
  let cleanedText = text
  for (const symbol in symbolMap) {
    const replacement = symbolMap[symbol]
    cleanedText = cleanedText.replaceAll(symbol, replacement)
  }
  return cleanedText.replaceAll(`â€"`, ' ').replaceAll(/Â/giu, '').replaceAll('â€™', '')
}

function testRegex() {
  const isCategoryMatch = (str) => {
    const regex = /^(?:Accessories\s*>\s*[^,>]+|[^,>]+\s*>\s*[^,>]+,Accessories\s*>\s*[^,>]+)$/
    return regex.test(str)
  }

  const testCases = [
    'Accessories > Cleaning Solutions',
    'Accessories > Consumables',
    'Accessories > Mounting Kits',
    'Accessories > Mousepads',
    'Accessories > Stands & Cooling',
    'Cars > Bonnets,Accessories > Consumables',
    'Peripherals > Mousepads,Accessories > Mousepads',
    'Computers > Accessories > Stands & Cooling',
    'Laptop > Accessories > Mousepads'
  ]

  testCases.forEach((test) => {
    console.log(`"${test}": ${isCategoryMatch(test)}`)
  })
}

function pullCategories() {
  const storedCategories = JSON.parse(localStorage.getItem('categories'))

  const csv = Papa.unparse(
    storedCategories.map((category) => {
      return {
        category
      }
    }),
    {
      delimiter: ';',
      quoteChars: '""'
    }
  )

  const blob = new Blob([csv], {
    type: 'text/csv'
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const today = new Date().toISOString().slice(0, 10)
  link.download = `categories-${today}.csv`
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function furtherRefinements(data) {
  const noLowStocks = handleLowStocks(data)
  const refinedCategories = refineCategories(noLowStocks)
  let adjustedPrices = adjustAdaptersAndConnectorsPricing(refinedCategories)
  adjustedPrices = adjustCablesPricing(adjustedPrices)
  const refinedIsFeatured = refineFeaturedItems(adjustedPrices)
  const prependedComputerCategories = prependComputerCategories(refinedIsFeatured)
  return prependedComputerCategories
}

function prependComputerCategories(products) {
  const result = products.map((product) => {
    return {
      ...product,
      categories: modifyCategory(product.categories)
    }
  })
  return result
}

function modifyCategory(category) {
  if (category.startsWith('Stationery')) return category
  if (category.startsWith('Tools')) return category.replace('Tools', DIY)
  return `Computers Laptops & Electronics > ${category}`
}

function outPutCsv(data) {
  const csvRaw = Papa.unparse(data, {
    delimiter: ';',
    quoteChars: '""'
  })

  const csv = removeSymbols(csvRaw)

  const blob = new Blob(
    [
      csv
        .replaceAll(/\u00a0/giu, ' ')
        .replaceAll('â€”', ' ')
        .replaceAll('â€‹', '')
    ],
    {
      type: 'text/csv'
    }
  )
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const today = new Date().toISOString().slice(0, 10)
  link.download = `computer-gadgets-woocommerce-products-${today}.csv`
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

defineExpose({
  dropzoneRef,
  isDragActive,
  pullCategories,
  testRegex,
  processEsquire
})
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
</style>
