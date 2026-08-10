import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const protect = async (req, res, next) => {
  let token

  try {
    // Get token from HttpOnly cookie
    token = req?.cookies?.token
    if (!token) {
      return res.status(401).json({
        message: 'Not authorized, no token',
      })
    }
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    //get user from the token
    req.user = await User.findById(decoded.id).select('-password')

    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: 'Not authorized' })
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

export default protect
