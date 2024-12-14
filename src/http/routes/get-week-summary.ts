import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../functions/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/summary',
    {
      preHandler: [app.authenticate], // Usa o middleware de autenticação
    },
    async request => {
      // Acessa o userId com segurança, após a autenticação
      const userId = (request.user as { id: string }).id

      // Passa o userId para a função que busca o resumo da semana
      const { summary } = await getWeekSummary(userId)

      return { summary }
    }
  )
}
