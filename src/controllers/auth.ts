import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../db/connection.ts'
import { users, type NewUser } from '../db/schema.ts'
import { generateToken } from '../utils/jwt.ts'
import { comparePasswords, hashPassword } from '../utils/passwords.ts'
import { eq } from 'drizzle-orm'

export const register = async (req: Request<any, any, NewUser>, res: Response) => {
	try {
		const { email, username, password, firstName, lastName } = req.body
		const hashedPassword = await hashPassword(password)

		const [user] = await db.insert(users).values({
			email,
			username,
			firstName,
			lastName,
			password: hashedPassword
		}).returning({
			id: users.id,
			email: users.email,
			username: users.username,
			firstName: users.firstName,
			lastName: users.lastName,
			createdAt: users.createdAt
		})

		const token = await generateToken({
			id: user.id,
			email: user.email,
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName
		})

		return res.status(201).json({
			message: 'User created',
			user,
			token
		})

	} catch (error) {
		console.error(`Registration error...`, error)
		res.status(500).json({ error: 'Failed to create user' })
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body

		const user = await db.query.users.findFirst({
			where: eq(users.email, email)
		})

		if (!user) {
			return res.status(401).json({
				message: 'Invalid credentials...'
			})
		}

		const isValidPassword = await comparePasswords(password, user.password)

		if (!isValidPassword) {
			return res.status(401).json({ message: 'Invalid creadentials...' })
		}

		const token = await generateToken({
			id: user.id,
			email: user.email,
			username: user.username
		})

		return res.json({
			message: 'Success',
			token
		})
	} catch (error) {
		console.error(`Loggin error`, error)
		res.status(500).json({ error: 'Failed to login' })
	}
}