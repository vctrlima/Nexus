import { makeRevokeRefreshTokenByUserId } from '@server/main/factories/use-cases'
import { RevokeRefreshTokenController } from '@server/presentation/controllers'

export const makeRevokeRefreshTokenController = () =>
  new RevokeRefreshTokenController(makeRevokeRefreshTokenByUserId())
