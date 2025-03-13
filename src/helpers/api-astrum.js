// API endpoint
const apiUrl = 'https://astrum.co.za/wp-json/wc/v3/products/'

// Basic Auth credentials (from the screenshot)
const username = 'ck_8bc30c53c48af9dfc63f88adceefe40b3aa77b92'
const password = 'cs_7cd98e61c352719126eeffe749b91ff3f2fb885b'

// Create Base64 encoded credentials for Basic Auth
const credentials = btoa(`${username}:${password}`)

// Fetch the products
export async function fetchAstrumProducts() {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Products data:', data)
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}
