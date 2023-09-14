import { makeFindUserByToken } from '@server/main/factories/use-cases'
import { AuthMiddleware } from '@server/presentation/middlewares'
import { Middleware } from '@server/presentation/protocols'

export const makeAuthMiddleware = (): Middleware =>
  new AuthMiddleware(makeFindUserByToken())
