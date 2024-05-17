import express from 'express';
import cors from 'cors'
import appRoutes from "./http/routes"
import connectDB from "./lib/db"

const app = express() 

connectDB();

app.use(cors())
app.use(express.json())

// Routes
app.use('/api', appRoutes);

export default app