import rateLimit from 'express-rate-limit'

// This rate limiter allows 60 requests per minute from a single IP address
// It is useful to prevent abuse and ensure fair usage of the API.
const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: 'Too many requests, please try again later.'
})

export default rateLimiter
