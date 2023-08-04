import { User } from '@/domain/entities'

export interface CreateUser {
  create: (params: CreateUser.Params) => CreateUser.Model
}

export namespace CreateUser {
  export type Params = User
  export type Model = Promise<{ id: string }>
}
