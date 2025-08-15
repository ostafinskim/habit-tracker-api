import express from 'express';

export const habitRouter = express.Router();

habitRouter.get('/', (req, res) => {
  res.json({ message: 'all habits' })
})

habitRouter.get('/:id', (req, res) => {
  res.json({ message: 'single habit' })
})

habitRouter.post('/', (req, res) => {
  res.json({ message: 'new habit' })
})

habitRouter.patch('/:id', (req, res) => {
  res.json({ message: 'update single habit' })
})

habitRouter.delete('/:id', (req, res) => {
  res.json({ message: 'delete single habit' })
})