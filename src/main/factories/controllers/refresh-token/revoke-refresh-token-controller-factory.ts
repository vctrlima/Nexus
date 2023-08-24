import { makeRevokeRefreshTokenByUserId } from '@/main/factories/use-cases'
import { RevokeRefreshTokenController } from '@/presentation/controllers'

export const makeRevokeRefreshTokenController = () =>
  new RevokeRefreshTokenController(makeRevokeRefreshTokenByUserId())
