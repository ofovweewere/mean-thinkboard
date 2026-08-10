import mongoose from 'mongoose'
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI_LOCAL)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1) //1 means exit with failure while 0 means with success
  }
}
