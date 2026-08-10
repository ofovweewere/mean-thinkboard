import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!name || !email || !password) {
      return res.status(404).json({ message: 'Please fill in all fields' })
    }

    // Optional - Check if the user exists (unique is in schema)
    // const userExists = await User.findOne({ email })
    // if (userExists) {
    //   res.status(400).json({ message: 'User already exists' })
    // }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create is similar to save
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    if (user) {
      const token = generateToken(user._id)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (err) {
    console.error('Error in register user controller', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
      })
    } else {
      res.status(400).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    console.error('Error in register user controller', err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (user) {
      const { _id, name, email } = user
      res.status(200).json({
        id: _id,
        name,
        email,
      })
    } else {
      res.status(400).json({ message: 'No user found' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user from getMe' })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token', {
    path: '/',
  })

  res.status(200).json({ message: 'Logged out' })
}

//Generate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}
