import { User } from '@server/domain/entities'

export interface FindUserByEmail {
  find: (email: FindUserByEmail.Params) => Promise<FindUserByEmail.Model>
}

export namespace FindUserByEmail {
  export type Params = string

  export type Model = User
}
