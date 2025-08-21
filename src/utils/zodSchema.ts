import { email, z } from 'zod';

export const loginSchema = z.object({
	email: z.email('Invalid email'),
	password: z.string().min(4, 'Password is required').max(255)
})

export const createHabitSchema = z.object({
	name: z.string()
})

export const habitParamSchema = z.object({
	id: z.string()
})