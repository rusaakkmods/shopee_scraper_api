import axios from 'axios'
import axiosRetry from 'axios-retry'

// Configure axios to retry requests on failure
// This setup retries failed requests up to 3 times with exponential backoff
// It retries on network errors or server errors (status codes 500 and above)
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: err => !err.response || err.response.status >= 500
})

export default axios
