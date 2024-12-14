import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-pending-goals'

export const getPendindGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pending-goals',
    {
      preHandler: [app.authenticate], // Usa o middleware de autenticação
    },
    async request => {
      // Aqui você acessa o userId com segurança, sem erro de tipagem
      const userId = (request.user as { id: string }).id

      // Passa o userId para a função que busca as metas pendentes
      const { pedingGoals } = await getWeekPendingGoals(userId)

      return { pedingGoals }
    }
  )
}
