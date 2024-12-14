import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createUser } from '../../functions/create-user'

export const createUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/register',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async request => {
      try {
        const { email, password } = request.body
        await createUser({
          email,
          password,
        })

        return { ok: 'user created successfully' }
      } catch (error) {
        return { error }
      }
    }
  )
}
