import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import notesRoute from './routes/notesRoute.js'
import { connectDB } from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

// should be placed before all middlewares e.g. ratelimiter
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)
app.use(express.json())
app.use(rateLimiter)
app.use('/api/notes', notesRoute)

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
})
