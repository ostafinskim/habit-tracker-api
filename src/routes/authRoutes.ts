import express from 'express';
import { register } from '../controllers/auth.ts';
import { validateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';

export const authRouter = express.Router();

authRouter.post('/register', validateBody(insertUserSchema), register)

authRouter.post('/login', (req, res) => {
	res.json({ message: 'login' })
})
