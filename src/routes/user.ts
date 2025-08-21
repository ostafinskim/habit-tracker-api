import express from 'express';
import { authenticateToken } from '../middleware/auth.ts';

export const userRouter = express.Router();

userRouter.use(authenticateToken)

userRouter.get('/', (req, res) => {
	res.json({ message: 'all users' })
})

userRouter.get('/:id', (req, res) => {
	res.json({ message: 'single user' })
})

userRouter.post('/', (req, res) => {
	res.json({ message: 'new user' })
})

userRouter.patch('/:id', (req, res) => {
	res.json({ message: 'update single user' })
})

userRouter.delete('/:id', (req, res) => {
	res.json({ message: 'delete single user' })
})