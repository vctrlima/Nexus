import { CreateRefreshToken } from '@/domain/use-cases'

export interface CreateRefreshTokenRepository {
  create: (
    params: CreateRefreshTokenRepository.Params,
  ) => Promise<CreateRefreshTokenRepository.Model>
}

export namespace CreateRefreshTokenRepository {
  export type Params = CreateRefreshToken.Params
  export type Model = CreateRefreshToken.Model
}
