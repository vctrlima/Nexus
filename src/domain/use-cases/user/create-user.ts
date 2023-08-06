import { User } from '@/domain/entities'

export interface CreateUser {
  create: (params: CreateUser.Params) => Promise<CreateUser.Model>
}

export namespace CreateUser {
  export type Params = User
  export interface Model {
    id: string
  }
}
