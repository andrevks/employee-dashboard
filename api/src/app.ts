import express, { Request, Response } from 'express'
import cors from 'cors'
import appRoutes from './http/routes'
import { ZodError } from 'zod'
import connectDB from './lib/db'

const app = express()

if (process.env.NODE_ENV !== 'test') {
  connectDB(process.env.MONGO_URI!)
}

app.use(cors())
app.use(express.json())

// Routes
app.use('/api', appRoutes)

app.use((error: Error, req: Request, res: Response) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return res.status(500).send({ message: 'Internal server error.' })
})

export default app
