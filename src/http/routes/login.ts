import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { loginUser } from '../../functions/loginUser'

type AppError = {
  message: string
  status?: number
}

export const loginUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body
        const response = await loginUser({ email, password }, app)

        // Retorna o token e o usuário ao cliente
        return reply.send(response)
      } catch (error) {
        const err = error as AppError // Asserção para o tipo esperado
        // Retorna o erro com um status apropriado
        return reply.status(401).send({ error: err.message })
      }
    }
  )
}
