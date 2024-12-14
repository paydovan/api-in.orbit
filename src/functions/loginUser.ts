import { db } from '../db'
import { users } from '../db/schema'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import type { FastifyInstance } from 'fastify'

interface LoginUserRequest {
  email: string
  password: string
}

export async function loginUser(
  { email, password }: LoginUserRequest,
  app: FastifyInstance
) {
  // Verifica se o email existe no banco
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user.length) {
    throw new Error('Credenciais inválidas') // Retorna erro se o email não for encontrado
  }

  const foundUser = user[0]

  // Compara a senha fornecida com o hash armazenado
  const passwordMatch = await bcrypt.compare(password, foundUser.password)
  if (!passwordMatch) {
    throw new Error('Credenciais inválidas') // Retorna erro se a senha estiver errada
  }

  // Gera um token JWT
  const token = app.jwt.sign(
    { id: foundUser.id, email: foundUser.email }, // Payload
    { expiresIn: '1h' } // Tempo de expiração
  )

  return {
    token,
    user: {
      id: foundUser.id,
      email: foundUser.email,
    },
  }
}
