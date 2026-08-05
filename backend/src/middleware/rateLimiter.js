import rateLimit from '../config/upstash.js'
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit('my-limit-key')
    if (!success) {
      return res.status(429).json({ message: 'Too many requests' })
    }
    next()
  } catch (err) {
    console.error('Error in rateLimiter middleware', err)
    next(err)
  }
}

export default rateLimiter
