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
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useDropZone } from '@vueuse/core'
import { XMLParser } from 'fast-xml-parser'
import Papa from 'papaparse'

import { processSyntechStock } from './helpers/syntechFixer'
import { processMicropointStock } from './helpers/micropointFixer'
import { processFrontosaStock } from './helpers/frontosaFixer'
import { processAstrumStock } from './helpers/astrumFixer'
import { symbolMap } from './helpers/constants'

export default {
  setup() {
    const dropzoneRef = ref(null)
    const { isDragActive } = useDropZone(dropzoneRef, onDrop)
    const syntechData = ref([])
    const micropointData = ref([])
    const frontosaData = ref([])
    const astrumData = ref([])

    async function onDrop(files) {
      if (files[0].name.includes('Astrum')) {
        const rawData = await Promise.all(files.map((file) => parseCsv(file)))

        astrumData.value = processAstrumStock(rawData)
        outPutCsv(astrumData.value)
      }
      if (files[0].name.includes('Frontosa')) {
        const rawData = await parseCsv(files[0])
        frontosaData.value = processFrontosaStock(rawData.result.data)
        outPutCsv(frontosaData.value)
      }

      const file = files[0]
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

    function parseXml(xmlFile) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const xmlRaw = event.target.result
        // const xmlNoSymbols = removeSymbols(xmlRaw)
        const parser = new XMLParser()
        const parsedXml = parser.parse(xmlRaw)

        if (xmlFile.name.includes('micropoint')) {
          micropointData.value = processMicropointStock(parsedXml)

          // TODO, first combine the two tables
          outPutCsv(micropointData.value)
        }

        if (xmlFile.name.includes('syntech')) {
          syntechData.value = processSyntechStock(parsedXml)
          // TODO, first combine the two tables
          outPutCsv(syntechData.value)
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
      return cleanedText.replaceAll(`â€”`, ' ').replaceAll(/Â/giu, '')
    }

    function outPutCsv(data) {
      const csvRaw = Papa.unparse(data, {
        delimiter: ';',
        quoteChars: '""'
        // escapeChar: ''
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
      // get today's date in a simple format
      const today = new Date().toISOString().slice(0, 10)
      link.download = `computer-gadgets-woocommerce-products-${today}.csv`
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }

    return {
      dropzoneRef,
      isDragActive
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
