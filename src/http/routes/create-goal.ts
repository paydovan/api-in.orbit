import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoal } from '../../functions/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      preHandler: [app.authenticate], // Usa o middleware de autenticação
      schema: {
        body: z.object({
          userId: z.string(),
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { userId, title, desiredWeeklyFrequency } = request.body
      await createGoal({
        userId,
        title,
        desiredWeeklyFrequency,
      })
    }
  )
}
