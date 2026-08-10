import express from 'express'

import {
  registerUser,
  loginUser,
  getMe,
  logout,
} from '../controller/userController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/logout', logout)

export default router
