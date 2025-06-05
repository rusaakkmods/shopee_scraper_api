import express from 'express'
import fetchShopeeProduct from '../services/shopeeFetcher'
import rateLimiter from '../utils/rateLimiter'

const app = express()
const PORT = process.env.PORT || 3000

// Set up a simple rate limiter to prevent abuse
app.use(rateLimiter)

app.get('/shopee', async (req, res) => {
  const { storeId, itemId } = req.query
  // Return 400 if params are missing
  if (!storeId || !itemId) return res.status(400).json({ error: 'Missing params' })

  try {
    // Fetch product data using the provided IDs
    const data = await fetchShopeeProduct(storeId as string, itemId as string)
    res.json(data)
  } catch (err) {
    // Return 500 with error details if fetching fails
    const errorMessage = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: 'Scrape failed', detail: errorMessage })
  }
})

// Start the server and log the port
app.listen(PORT, () => console.log(`API running on :${PORT}`))
