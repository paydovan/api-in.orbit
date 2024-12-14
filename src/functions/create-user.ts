import { db } from '../db'
import { users } from '../db/schema'
import bcrypt from 'bcrypt'

interface CreateUserRequest {
  email: string
  password: string
}

export async function createUser({ email, password }: CreateUserRequest) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const result = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword,
    })
    .returning()

  const user = result[0]

  return {
    user,
  }
}
