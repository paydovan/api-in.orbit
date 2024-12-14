import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      id: string // Tipagem de id
      email: string
    }
  }

  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
  }
}
