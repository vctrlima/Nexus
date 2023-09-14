import { RefreshToken } from '@server/domain/entities'

export interface CreateRefreshToken {
  create: (data: CreateRefreshToken.Params) => Promise<CreateRefreshToken.Model>
}

export namespace CreateRefreshToken {
  export interface Params {
    jti: string
    refreshToken: string
    userId: string
  }

  export type Model = RefreshToken
}
