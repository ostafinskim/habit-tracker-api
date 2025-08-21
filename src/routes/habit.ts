import express from 'express';
import { validateBody, validateParams } from '../middleware/validation.ts';
import { createHabitSchema, updateHabitSchema, uuidSchema } from '../utils/zodSchema.ts';
import { authenticateToken } from '../middleware/auth.ts';
import { createHabit, deleteHabit, getHabitById, getUserHabits, updateHabit } from '../controllers/habit.ts';

export const habitRouter = express.Router();

habitRouter.use(authenticateToken)

habitRouter.get('/', getUserHabits)

habitRouter.get('/:id', validateParams(uuidSchema), getHabitById)

habitRouter.post('/', validateBody(createHabitSchema), createHabit)

habitRouter.patch('/:id', validateParams(uuidSchema), validateBody(updateHabitSchema), updateHabit)

habitRouter.delete('/:id', validateParams(uuidSchema), deleteHabit)