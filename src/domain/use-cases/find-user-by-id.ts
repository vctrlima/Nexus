import { User } from '@/domain/entities'

export interface FindUserById {
  find: (id: FindUserById.Params) => Promise<FindUserById.Model>
}

export namespace FindUserById {
  export type Params = string
  export type Model = User
}
