import { calculateFullPrice, saveSkuList } from '../helpers/baseHelpers'
import esquireStock from '@/helpers/esquireData.json'
import Papa from 'papaparse'

export function processEsquireStock() {
    downloadCategories();
}

function downloadCategories() {
    // Create a Set to store unique categories
    const categories = new Set();
    
    // Extract categories from each product
    esquireStock.forEach(product => {
        if (product.groupName) {
            categories.add(product.groupName);
        }
    });
    
    // Convert Set to sorted array
    const uniqueCategories = Array.from(categories).sort();
    
    // Prepare data for CSV (array of objects with single column)
    const refinedCategories = uniqueCategories.map(category => ({ Category: category }));
    
    // Generate CSV content using Papa Parse
    const csvContent = Papa.unparse(refinedCategories, {
        delimiter: ';',
        quoteChars: '""'
    });

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);
    link.download = `esquire-categories-${today}.csv`;
    
    // Trigger download
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}