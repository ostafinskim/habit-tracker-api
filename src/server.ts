import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { authRouter } from './routes/authRoutes.ts'
import { habitRouter } from './routes/habitRoutes.ts'
import { userRouter } from './routes/userRoutes.ts'
import { isTestEnv } from '../env.ts'

export const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny', { skip: () => isTestEnv() }))

app.use('/api/auth', authRouter)
app.use('/api/habit', habitRouter)
app.use('/api/user', userRouter)


app.get('/health', (req, res) => {
	res.json({ message: 'Doing good!' })
})
