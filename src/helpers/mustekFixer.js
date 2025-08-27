/**
 * Helper functions for processing Mustek data
 */

import { calculateFullPrice } from './baseHelpers'
import Papa from 'papaparse'

// Mustek API endpoints
const MUSTEK_TOKEN = 'e9a64d38-9735-4aa7-9ac0-60fcbea26c1f' // revoked
const MUSTEK_ITEMS_URL = `https://api.mustek.co.za/Customer/Items.ashx?CustomerToken=${MUSTEK_TOKEN}`
const MUSTEK_STOCK_URL = `https://api.mustek.co.za/Customer/ItemsStock.ashx?CustomerToken=${MUSTEK_TOKEN}`
const MUSTEK_MEDIA_URL = `https://api.mustek.co.za/Customer/Media.ashx?CustomerToken=${MUSTEK_TOKEN}`





/**
 * Fetch stock information from Mustek API
 * @returns {Promise<Object>} - Object mapping SKUs to stock quantities
 */
async function fetchMustekStock() {
  try {
    const response = await fetch(MUSTEK_STOCK_URL)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Mustek stock: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    const parsedData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    })
    
    return parsedData
  } catch (error) {
    console.error('Error fetching Mustek stock:', error)
    return {}
  }
}

/**
 * Fetch items information from Mustek API
 * @returns {Promise<Object>} - Parsed items data from Mustek
 */
async function fetchMustekItems() {
  try {
    const response = await fetch(MUSTEK_ITEMS_URL)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Mustek items: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    const parsedData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    })
    
    return parsedData
  } catch (error) {
    console.error('Error fetching Mustek items:', error)
    return {}
  }
}

/**
 * Fetch media/images information from Mustek API
 * @returns {Promise<Object>} - Object mapping SKUs to image URLs
 */
async function fetchMustekMedia() {
  try {
    const response = await fetch(MUSTEK_MEDIA_URL)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Mustek media: ${response.status} ${response.statusText}`)
    }
    
    const csvText = await response.text()
    const parsedData = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    })
    
    return parsedData
  } catch (error) {
    console.error('Error fetching Mustek media:', error)
    return {}
  }
}

/**
 * Process Mustek stock data from CSV format
 * @param {Array} itemsData - The parsed items data from Mustek API
 * @param {Array} stockData - The parsed stock data from Mustek API
 * @param {Array} mediaData - The parsed media data from Mustek API
 * @returns {Array} - Processed data in the standard format for the application
 */
export function processMustekStock(itemsData, stockData = [], mediaData = []) {
  if (!itemsData || !Array.isArray(itemsData) || itemsData.length === 0) {
    console.error('Invalid or empty Mustek items data')
    return []
  }
  
  // Create a map of stock data for efficient lookup
  const stockMap = {}
  if (stockData && Array.isArray(stockData)) {
    stockData.forEach(item => {
      if (item.ItemId) {
        stockMap[item.ItemId] = item
      }
    })
  }
  
  // Create a map of media data for efficient lookup (one-to-many relationship)
  const mediaMap = {}
  if (mediaData && Array.isArray(mediaData)) {
    mediaData.forEach(item => {
      if (item.ItemId) {
        if (!mediaMap[item.ItemId]) {
          mediaMap[item.ItemId] = []
        }
        mediaMap[item.ItemId].push(item)
      }
    })
  }
  
  // Process and combine the data
  const combinedData = itemsData.map(item => {
    // Get stock information for this item
    const stockInfo = stockMap[item.ItemId] || {}
    
    // Get media information for this item
    const mediaItems = mediaMap[item.ItemId] || []
    
    // Return the combined item with original field names
    const result = {
      // Original item fields
      ...item,
      
      // Add stock information
      Stock: stockInfo,
      
      // Add media information
      Media: mediaItems,
    }
    return result
  })
  // .filter(item => {
  //   // Filter out items with invalid data or out of stock
  //   return item.sku && item.name && item.regular_price
  // })
  debugger
  return combinedData
}

/**
 * Fetch and process all Mustek data (items, stock, and media)
 * @returns {Promise<Array>} - Processed Mustek data
 */
export async function fetchAndProcessMustekData() {
  try {
    // Fetch all data in parallel
    const [itemsData, stockData, mediaData] = await Promise.all([
      fetchMustekItems(),
      fetchMustekStock(),
      fetchMustekMedia()
    ])
    // Process all data together
    return processMustekStock(itemsData.data, stockData.data, mediaData.data)
  } catch (error) {
    console.error('Error processing Mustek data:', error)
    return []
  }
}