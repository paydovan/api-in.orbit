import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { getPendindGoalsRoute } from './routes/get-pending-goals'
import { createCompletionRoute } from './routes/create-completion'
import { getWeekSummaryRoute } from './routes/get-week-summary'
import fastifyCors from '@fastify/cors'
import { createUserRoute } from './routes/register'
import fastifyJwt from '@fastify/jwt'
import { env } from '../env'
import { loginUserRoute } from './routes/login'
import { registerAuthMiddleware } from './middleware/auth'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'https://react-in-orbit.vercel.app',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

// Registra o middleware de autenticação
registerAuthMiddleware(app)

app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendindGoalsRoute)
app.register(getWeekSummaryRoute)

app.register(createUserRoute)
app.register(loginUserRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!!')
  })
