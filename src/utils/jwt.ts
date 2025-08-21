import { createSecretKey } from "crypto";
import { jwtVerify, SignJWT } from "jose";
import env, { type Env } from "../../env.ts";
import type { JWTPayload } from "jose";


export interface JwtPayload extends JWTPayload {
	id: string
	email: string
	username: string
}

export const generateToken = (payload: JwtPayload) => {
	const secret = env.JWT_SECRET
	const secretKey = createSecretKey(secret, 'utf-8')

	return new SignJWT(payload)
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime(env.JWT_EXPIRES_IN || '7d')
		.sign(secretKey)
}

export const verifyToken = async (token: string): Promise<JwtPayload> => {
	const secretKey = createSecretKey(env.JWT_SECRET, 'utf-8')
	const { payload } = await jwtVerify(token, secretKey)

	return payload as JwtPayload
}