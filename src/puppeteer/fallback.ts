import puppeteer from 'puppeteer-extra' // enhanced version of Puppeteer for browser automation
import StealthPlugin from 'puppeteer-extra-plugin-stealth' // stealth plugin to help evade bot detection

// Add the stealth plugin to puppeteer to mask automation
puppeteer.use(StealthPlugin())

export default async function usePuppeteerFallback(shopid: string, itemid: string) {
  // Launch a headless (no UI) browser instance 
  // and set a generic user agent string to mimic a real browser
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0')
  const shopeeHost = process.env.SHOPEE_HOST || 'https://shopee.co.id'
  // Navigate to the product page and wait until network is idle
  await page.goto(`${shopeeHost}/a-i.${shopid}.${itemid}`, { waitUntil: 'networkidle2' })

  const result = await page.evaluate(async () => { 
    // Run code inside the browser context
    // Fetch product data from Shopee's API with query params
    const res = await fetch('/api/v4/pdp/get_pc?' + new URLSearchParams({
      shopid: window.location.pathname.split('.')[1],
      itemid: window.location.pathname.split('.')[2],
      tz_offset_minutes: '420',
      detail_level: '0' // not yet sure what this does, but it's in the original request
    }), {
      // Set custom headers to mimic a real browser request
      headers: {
        'accept': 'application/json',
        'x-api-source': 'pc',
        'x-requested-with': 'XMLHttpRequest'
      }
    })
    return await res.json()
  })

  // Close the browser to free resources
  await browser.close()
  return result
}
