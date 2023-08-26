import { makeHandleRefreshToken } from '@/main/factories/use-cases'
import { HandleRefreshTokenController } from '@/presentation/controllers'

export const makeHandleRefreshTokenController = () =>
  new HandleRefreshTokenController(makeHandleRefreshToken())
