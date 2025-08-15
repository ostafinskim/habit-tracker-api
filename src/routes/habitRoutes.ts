import express from 'express';
import { z } from 'zod'
import { validateBody, validateParams } from '../middleware/validation.ts';

export const habitRouter = express.Router();

const createHabitSchema = z.object({
	name: z.string()
})

const habitParamSchema = z.object({
	id: z.string()
})

habitRouter.get('/', (req, res) => {
	res.json({ message: 'all habits' })
})

habitRouter.get('/:id', validateParams(habitParamSchema), (req, res) => {
	res.json({ message: 'single habit' })
})

habitRouter.post('/', validateBody(createHabitSchema), (req, res) => {
	res.json({ message: 'new habit' })
})

habitRouter.patch('/:id', validateParams(habitParamSchema), (req, res) => {
	res.json({ message: 'update single habit' })
})

habitRouter.delete('/:id', validateParams(habitParamSchema), (req, res) => {
	res.json({ message: 'delete single habit' })
})