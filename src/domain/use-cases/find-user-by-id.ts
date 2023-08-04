import { User } from '@/domain/entities'

export interface FindUserById {
  find: (id: FindUserById.Params) => FindUserById.Model
}

export namespace FindUserById {
  export type Params = string
  export type Model = Promise<User>
}
