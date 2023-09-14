import { FindUserByEmail } from '@server/domain/use-cases'

export interface FindUserByEmailRepository {
  findByEmail: (
    email: FindUserByEmailRepository.Params,
  ) => Promise<FindUserByEmailRepository.Model>
}

export namespace FindUserByEmailRepository {
  export type Params = FindUserByEmail.Params
  export type Model = FindUserByEmail.Model
}
