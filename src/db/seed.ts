import db from "./connection.ts"

import { users, habits, entries, tags, habitTags } from './schema.ts'

const seed = async () => {
	console.log(`::: Start database seed :::`)

	try {
		console.log(`::: Clearing existing data :::`)
		await db.delete(users)
		await db.delete(habits)
		await db.delete(entries)
		await db.delete(tags)
		await db.delete(habitTags)

		console.log(`::: Creating demo users :::`)
		const [demoUser] = await db.insert(users).values({
			email: 'demo@app.com',
			password: 'password123',
			firstName: 'John',
			lastName: 'Doe',
			username: 'demo'
		})
			.returning()


		console.log(`::: Creating tags :::`)
		const [healthTag] = await db.insert(tags).values([
			{ name: 'Health', color: '#ffc600' },
			{ name: 'Calm', color: '#00b3ff' },
		]).returning()

		console.log(`::: Creating habit :::`)

		const [exerciseHabit] = await db.insert(habits).values({
			userId: demoUser.id,
			name: 'Exercise',
			description: 'Daily workout',
			frequency: 'daily',
			targetCount: 1,
		}).returning()

		await db.insert(habitTags).values({
			habitId: exerciseHabit.id,
			tagId: healthTag.id
		})

		console.log(`::: Adding completion entries :::`)

		const today = new Date()
		today.setHours(12, 0, 0, 0)

		for (let i = 0; i < 7; i++) {
			const date = new Date(today)
			date.setDate(date.getDate() - 1)
			await db.insert(entries).values({
				habitId: exerciseHabit.id,
				completionDate: date
			})
		}

		console.log(`::: Database seeded :::`)
		console.log(`::: User credentials: :::`)
		console.log(`::: email: ${demoUser.email} :::`)
		console.log(`::: username: ${demoUser.username} :::`)
		console.log(`::: password: ${demoUser.password} :::`)

	} catch (error) {
		console.error(`seed failed`, error)
		process.exit(1)
	}
}

if (import.meta.url === `file://${process.argv[1]}`) {
	seed()
		.then(() => process.exit(0))
		.catch(e => process.exit(1))
}

export default seed