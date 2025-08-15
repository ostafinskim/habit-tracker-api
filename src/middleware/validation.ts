import type { NextFunction, Request, Response } from 'express'
import { type ZodType, ZodError } from 'zod'

export const validateBody = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData = schema.parse(req.body)
			req.body = validatedData
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					error: 'Validation failed',
					details: error.issues.map(issue => ({
						field: issue.path.join('.'),
						message: issue.message
					}))
				})
			}
			next(error)
		}
	}
}

export const validateParams = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData = schema.parse(req.params)
			req.body = validatedData
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					error: 'Invalid params',
					details: error.issues.map(issue => ({
						field: issue.path.join('.'),
						message: issue.message
					}))
				})
			}
			next(error)
		}
	}
}

export const validateQuery = (schema: ZodType) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData = schema.parse(req.query)
			req.body = validatedData
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					error: 'Invalid query',
					details: error.issues.map(issue => ({
						field: issue.path.join('.'),
						message: issue.message
					}))
				})
			}
			next(error)
		}
	}
}