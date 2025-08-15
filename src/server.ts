import express from 'express';
import { authRouter } from './routes/authRoutes.ts';
import { habitRouter } from './routes/habitRoutes.ts';
import { userRouter } from './routes/userRoutes.ts';

export const app = express()

app.use('/api/auth', authRouter)
app.use('/api/habit', habitRouter)
app.use('/api/user', userRouter)


app.get('/health', (req, res) => {
  res.json({ message: 'Doing good!' })
})
