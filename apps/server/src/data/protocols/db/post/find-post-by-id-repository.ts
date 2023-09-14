import { FindPostById } from '@server/domain/use-cases'

export interface FindPostByIdRepository {
  findById: (
    id: FindPostByIdRepository.Params,
  ) => Promise<FindPostByIdRepository.Model>
}

export namespace FindPostByIdRepository {
  export type Params = FindPostById.Params
  export type Model = FindPostById.Model
}
