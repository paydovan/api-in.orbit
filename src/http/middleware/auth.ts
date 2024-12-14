import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

// Defina o tipo do payload JWT
interface JWTDecodePayload {
  id: string // ou o tipo correspondente para o id
  email: string
}

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    // Verifica o token JWT e decodifica
    const decoded = await request.jwtVerify<JWTDecodePayload>()

    // Agora 'decoded' tem o tipo JWTDecodePayload, com 'id' e 'email'
    request.user = decoded // Adiciona ao request a propriedade 'user' tipada
  } catch (err) {
    // Retorna erro 401 se o token não for válido ou estiver ausente
    reply.status(401).send({ error: 'Unauthorized' })
  }
}

// Função para registrar o middleware no Fastify
export const registerAuthMiddleware = (app: FastifyInstance): void => {
  app.decorate('authenticate', authMiddleware)
}
