import { User } from '@/domain/entities'

export interface UpdateUser {
  update: (params: UpdateUser.Params) => Promise<UpdateUser.Model>
}

export namespace UpdateUser {
  export type Params = User
  export type Model = User
}
