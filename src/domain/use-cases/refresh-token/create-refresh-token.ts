import { RefreshToken } from '@/domain/entities'

export interface CreateRefreshToken {
  create: (
    data: CreateRefreshToken.Params,
  ) => Promise<CreateRefreshToken.Result>
}

export namespace CreateRefreshToken {
  export type Params = {
    userId: string
    expiresIn: number
  }

  export type Result = RefreshToken
}
