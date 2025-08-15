import express from 'express';

export const authRouter = express.Router();

authRouter.post('/login', (req, res) => {
	res.json({ message: 'login' })
})

authRouter.post('/register', (req, res) => {
	res.json({ message: 'register' })
})
