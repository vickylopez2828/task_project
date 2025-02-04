import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db'
import projectRoutes from './routes/projectRoutes'
import authRoutes from './routes/authRoutes'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
dotenv.config()
connectDB()

const app = express()
//CORS
app.use(cors(corsConfig))
//loggin
app.use(morgan('dev'))
//leer datos de formularios
app.use(express.json())
//Routes
app.use('/api/projects',projectRoutes)
app.use('/api/auth', authRoutes)
export default app