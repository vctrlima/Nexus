import { FindRefreshTokenById } from '@server/domain/use-cases'

export interface FindRefreshTokenByIdRepository {
  findById: (
    id: FindRefreshTokenByIdRepository.Params,
  ) => Promise<FindRefreshTokenByIdRepository.Model>
}

export namespace FindRefreshTokenByIdRepository {
  export type Params = FindRefreshTokenById.Params
  export type Model = FindRefreshTokenById.Model
}
