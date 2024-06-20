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

import { processSyntechStock } from './helpers/syntechFixer'
import { processMicropointStock } from './helpers/micropointFixer'

export default {
  setup() {
    const dropzoneRef = ref(null)
    const filesData = ref([])
    const { isOverDropZone } = useDropZone(dropzoneRef, onDrop)
    const syntechData = ref([])
    const micropointData = ref([])

    async function onDrop(files) {
      parseXml(files[0])
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
      const filtered = text
        .replaceAll('™', '') // Success
        .replaceAll('∅', '')
        .replaceAll('—', '-')
        .replaceAll('•', '-')
        .replaceAll('‘', "'")
        .replaceAll('₂', '2')
        .replaceAll('¹⁷', ' to the power 17')
        .replaceAll('¹', '1')
        .replaceAll('²', '2')
        .replaceAll('³', '3')
        .replaceAll('Ω', 'ohms')
        .replaceAll('±', ' plus or minus ')
        .replaceAll('°', ' deg ')
        .replaceAll('“', '') // Success
        .replaceAll('”', '') // Success
        .replaceAll('″', 'inches ') // Success
        .replaceAll('®', '') // Success
        .replaceAll('©', '') // Success
        .replaceAll('⎓', '') // Success
        .replaceAll('×', 'x')
        .replaceAll('△', '')
        .replaceAll('µs', 'microseconds')
        .replaceAll(' ‎', ' ')
        .replaceAll(/\u200e/giu, ' ')
        .replaceAll('º', 'deg ')
        .replaceAll('.', '.')
        .replaceAll(/\u2024/giu, '.')
        .replaceAll(/\u2025/giu, '.')
        .replaceAll(/\u2019/giu, "'") // Success
        .replaceAll(/\u2013/giu, '-') // Success
        .replaceAll('≤', ' less than ') // Success
        .replaceAll('≥', ' greater than ') // Success
        .replaceAll('≦', ' less than or equal to ') // Success
        .replaceAll('≧', ' greater than or equal to ') // Success
        .replaceAll(/\u00a0/giu, ' ')
        .replaceAll(/\u00e2/giu, '')
        .replaceAll('€', '')
        .replaceAll('ª', '')
        .replaceAll('ª', '')
        .replaceAll('℃', ' degC') // Success
        .replaceAll('℉', ' degF') // Success
        .replaceAll('◦C', ' degC') // Success
      return filtered.replaceAll(`â€”`, ' ').replaceAll(/Â/giu, '')
    }
    // ead:9 175Âµs  µs to 200Âµs; Rand
    function outPutCsv(data) {
      const csvRaw = Papa.unparse(data, {
        delimiter: ';',
        quoteChars: '""'
        // escapeChar: ''
      })

      const csv = removeSymbols(csvRaw)

      // const csv = csvRaw
      //   .replaceAll(/all\D\D\Wand more/giu, 'all and more')
      //   .replaceAll('â€”', ' ')
      //   .replaceAll('Â', '')
      //   .replaceAll(/Â/giu, '')
      //   .replaceAll(/\u00a0/giu, ' ')
      //   .replaceAll(/\u00e2/giu, '')

      //powerful processor that can handle it all
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
      link.download = 'computer-gadgets-woocommerce-products.csv'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
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
