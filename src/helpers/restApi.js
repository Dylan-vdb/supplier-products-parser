import axios from 'axios'

const BATCH_SIZE = 50
const TOTAL_PRODUCTS = 3000 // Replace with the actual total number of products
const DELAY_MS = 10000 // 10 seconds

const products = [
  /* Your 3000 products here */
]
let processedCount = 0

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchAllProducts = async () => {
  let allProducts = []
  let page = 1
  let fetchedProducts = []

  do {
    try {
      console.log(`Fetching products from page ${page}...`)
      const response = await axios.get('https://computergadgets.co.za//wp-json/wc/v3/products', {
        params: { per_page: BATCH_SIZE, page },
        // headers: {
        //   'X-API-KEY': 'ck_5ee8a80eb429b6c65127522393593a42116936c4',
        //   'X-API-SECRET': 'cs_a7bde7b0b3fe4ce77ad6d7c013b12f1beeeec315'
        // },
        auth: {
          username: 'ck_5ee8a80eb429b6c65127522393593a42116936c4',
          password: 'cs_a7bde7b0b3fe4ce77ad6d7c013b12f1beeeec315'
        }
      })
      fetchedProducts = response.data
      allProducts = [...allProducts, ...fetchedProducts]
      page++
      debugger
      await delay(DELAY_MS) // Add delay to avoid overloading the server
    } catch (error) {
      console.error(error)
    }
  } while (fetchedProducts.length === BATCH_SIZE)

  return allProducts
}
