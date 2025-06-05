import dotenv from 'dotenv'
dotenv.config()

// This module exports a function to retrieve proxy connection details from environment variables.
// It is designed to be used in applications that require proxy settings, such as web scraping or API requests.
export default function getProxy() {
  const username = process.env.BRIGHT_DATA_USERNAME || '**********'
  const password = process.env.BRIGHT_DATA_PASSWORD || '**********'
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
