import { DeleteUser } from '@/domain/use-cases'

export interface DeleteUserRepository {
  delete: (
    id: DeleteUserRepository.Params,
  ) => Promise<DeleteUserRepository.Model>
}

export namespace DeleteUserRepository {
  export type Params = DeleteUser.Params
  export type Model = DeleteUser.Model
}
