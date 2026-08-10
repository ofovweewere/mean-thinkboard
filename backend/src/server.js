import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'

import notesRoute from './routes/notesRoute.js'
import { connectDB } from './config/db.js'
import rateLimiter from './middleware/rateLimiter.js'
import userRoute from './routes/userRoute.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

const __dirname = path.resolve()

if (process.env.NODE_ENV !== 'production') {
  // should be placed before all middlewares e.g. ratelimiter
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  )
}

app.use(express.json())
app.use(cookieParser())
app.use(rateLimiter)
app.use('/api/notes', notesRoute)
app.use('/api/users', userRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/my-react-app/dist')))
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '../frontend/my-react-app', 'dist', 'index.html'),
    )
  })
}

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
})
