import { CreateUser } from '@server/domain/use-cases'

export interface CreateUserRepository {
  create: (
    user: CreateUserRepository.Params,
  ) => Promise<CreateUserRepository.Model>
}

export namespace CreateUserRepository {
  export type Params = CreateUser.Params
  export type Model = CreateUser.Model
}
