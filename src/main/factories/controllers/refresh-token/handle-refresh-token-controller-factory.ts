import { HandleRefreshTokenController } from '@/presentation/controllers'
import { makeHandleRefreshToken } from '../../use-cases'

export const makeHandleRefreshTokenController = () =>
  new HandleRefreshTokenController(makeHandleRefreshToken())
