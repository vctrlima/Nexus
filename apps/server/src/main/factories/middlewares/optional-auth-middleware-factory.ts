import { makeFindUserByToken } from '@server/main/factories/use-cases'
import { OptionalAuthMiddleware } from '@server/presentation/middlewares'
import { Middleware } from '@server/presentation/protocols'

export const makeOptionalAuthMiddleware = (): Middleware =>
  new OptionalAuthMiddleware(makeFindUserByToken())
