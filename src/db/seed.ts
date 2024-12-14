import { client, db } from '.'
import { goalCompletions, goals, users } from './schema'
import dayjs from 'dayjs'
import bcrypt from 'bcrypt'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)
  await db.delete(users)

  const hashedPassword = await bcrypt.hash('123456', 10)

  const user = await db
    .insert(users)
    .values([
      {
        email: 'johdoe@example.com',
        password: hashedPassword,
      },
      {
        email: 'admin@example.com',
        password: hashedPassword,
      },
    ])
    .returning()

  const result = await db
    .insert(goals)
    .values([
      { userId: user[0].id, title: 'Acordar Cedo', desiredWeeklyFrequency: 5 },
      { userId: user[0].id, title: 'Ir a academia', desiredWeeklyFrequency: 3 },
      { userId: user[0].id, title: 'Meditar', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
