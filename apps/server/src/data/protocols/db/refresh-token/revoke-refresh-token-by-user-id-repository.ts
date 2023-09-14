import { RevokeRefreshTokenByUserId } from '@server/domain/use-cases'

export interface RevokeRefreshTokenByUserIdRepository {
  revokeByUserId: (
    userId: RevokeRefreshTokenByUserIdRepository.Params,
  ) => Promise<RevokeRefreshTokenByUserIdRepository.Model>
}

export namespace RevokeRefreshTokenByUserIdRepository {
  export type Params = RevokeRefreshTokenByUserId.Params
  export type Model = RevokeRefreshTokenByUserId.Model
}
