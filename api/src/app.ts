import express from 'express'
import cors from 'cors'
import appRoutes from './http/routes'
import connectDB from './lib/db'

const app = express()

if (process.env.NODE_ENV !== 'test') {
  connectDB(process.env.MONGO_URI!)
}

app.use(cors())
app.use(express.json())

// Routes
app.use('/api', appRoutes)

export default app
