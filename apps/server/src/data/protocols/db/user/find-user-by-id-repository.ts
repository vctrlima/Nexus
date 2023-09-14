import { FindUserById } from '@server/domain/use-cases'

export interface FindUserByIdRepository {
  findById: (
    id: FindUserByIdRepository.Params,
  ) => Promise<FindUserByIdRepository.Model>
}

export namespace FindUserByIdRepository {
  export type Params = FindUserById.Params
  export type Model = FindUserById.Model
}
