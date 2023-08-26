import { User } from '@/domain/entities'

export interface FindUserByToken {
  findUserByToken: (
    accessToken: FindUserByToken.Params,
  ) => Promise<FindUserByToken.Model>
}

export namespace FindUserByToken {
  export type Params = string
  export type Model = User
}
