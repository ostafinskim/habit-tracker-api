import { email, z } from 'zod';

export const loginSchema = z.object({
	email: z.email('Invalid email'),
	password: z.string().min(4, 'Password is required').max(255)
})

export const createHabitSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	frequency: z.string(),
	targetCount: z.string(),
	tagIds: z.array(z.string()).optional()
})

export const updateHabitSchema = z.object({
	name: z.string().min(1).max(100).optional(),
	description: z.string().optional(),
	frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
	targetCount: z.number().int().positive().optional(),
	isActive: z.boolean().optional(),
	tagIds: z.array(z.string().uuid()).optional(),
})

export const uuidSchema = z.object({
	id: z.uuid('Invalid habit ID format'),
})