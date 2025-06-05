import dotenv from 'dotenv'
dotenv.config()

// This module exports a function to retrieve proxy connection details from environment variables.
// It is designed to be used in applications that require proxy settings, such as web scraping or API requests.
export default function getProxy() {
  const username = process.env.BRIGHT_DATA_USERNAME || 'brd-customer-hl_16acc6e1-zone-residential_proxy1'
  const password = process.env.BRIGHT_DATA_PASSWORD || 'aj1g3ort351c'
  const host = process.env.BRIGHT_DATA_HOST || 'brd.superproxy.io'
  const port = parseInt(process.env.BRIGHT_DATA_PORT || '33335')

  // Return an object containing proxy connection details
  return {
    host,
    port,
    auth: {
      username,
      password
    }
  }
}
