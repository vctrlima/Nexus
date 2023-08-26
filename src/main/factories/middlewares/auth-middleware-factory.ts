import { makeFindUserByToken } from '@/main/factories/use-cases'
import { AuthMiddleware } from '@/presentation/middlewares'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (): Middleware =>
  new AuthMiddleware(makeFindUserByToken())
