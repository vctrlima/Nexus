import { DeleteRefreshToken } from '@server/domain/use-cases'

export interface DeleteRefreshTokenRepository {
  delete: (
    id: DeleteRefreshTokenRepository.Params,
  ) => Promise<DeleteRefreshTokenRepository.Model>
}

export namespace DeleteRefreshTokenRepository {
  export type Params = DeleteRefreshToken.Params
  export type Model = DeleteRefreshToken.Model
}
