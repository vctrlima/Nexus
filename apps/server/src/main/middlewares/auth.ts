import { adaptMiddleware } from '@server/main/adapters'
import { makeAuthMiddleware } from '@server/main/factories/middlewares'

export const auth = adaptMiddleware(makeAuthMiddleware())
