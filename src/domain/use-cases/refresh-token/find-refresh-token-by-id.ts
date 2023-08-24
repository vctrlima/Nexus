import { RefreshToken } from '@/domain/entities'

export interface FindRefreshTokenById {
  find: (id: FindRefreshTokenById.Params) => Promise<FindRefreshTokenById.Model>
}

export namespace FindRefreshTokenById {
  export type Params = string
  export type Model = RefreshToken
}
