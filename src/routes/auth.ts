import express from 'express';
import { login, register } from '../controllers/auth.ts';
import { validateBody } from '../middleware/validation.ts';
import { insertUserSchema } from '../db/schema.ts';
import { loginSchema } from '../utils/zodSchema.ts';

export const authRouter = express.Router();

authRouter.post('/register', validateBody(insertUserSchema), register)

authRouter.post('/login', validateBody(loginSchema), login)
