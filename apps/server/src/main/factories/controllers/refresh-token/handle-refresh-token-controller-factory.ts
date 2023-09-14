import { makeHandleRefreshToken } from '@server/main/factories/use-cases'
import { HandleRefreshTokenController } from '@server/presentation/controllers'

export const makeHandleRefreshTokenController = () =>
  new HandleRefreshTokenController(makeHandleRefreshToken())
