import axios from '../utils/retryAxios'
import getProxy from '../utils/proxyPool'
import usePuppeteerFallback from '../puppeteer/fallback'

// Define an async function to fetch Shopee product data
export default async function fetchShopeeProduct(shopid: string, itemid: string) {
  const shopeeHost = process.env.SHOPEE_HOST || 'https://shopee.co.id'
  const url = `${shopeeHost}/api/v4/pdp/get_pc`

  try {
    const rawProxy = getProxy() // Get proxy settings
    const proxy = rawProxy
      ? { // If proxy is available, ensure auth fields are not undefined
          ...rawProxy,
          auth: {
            username: rawProxy.auth?.username ?? '',
            password: rawProxy.auth?.password ?? ''
          }
        }
      : undefined // If no proxy, set proxy to undefined

    // Make a GET request to Shopee API with query params, headers, and optional proxy
    const response = await axios.get(url, {
      params: { itemid, shopid, tz_offset_minutes: 420, detail_level: 0 },
      headers: {
        'User-Agent': 'Mozilla/5.0', // Mimic a browser user agent
        'Referer': `${shopeeHost}/a-i.${shopid}.${itemid}`, // Set referer to product page
        'Origin': `${shopeeHost}`, // Set origin header
        'x-api-source': 'pc', // Custom Shopee header
        'x-requested-with': 'XMLHttpRequest' // Indicate AJAX request
      },
      proxy
    })
    return response.data
  } catch (e) {
    // If the axios request fails (e.g., blocked, network error), use Puppeteer fallback
    return await usePuppeteerFallback(shopid, itemid)
  }
}
