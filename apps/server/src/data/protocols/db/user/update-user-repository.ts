import { UpdateUser } from '@server/domain/use-cases'

export interface UpdateUserRepository {
  update: (
    user: UpdateUserRepository.Params,
  ) => Promise<UpdateUserRepository.Model>
}

export namespace UpdateUserRepository {
  export type Params = UpdateUser.Params
  export type Model = UpdateUser.Model
}
