import { DeletePost } from '@server/domain/use-cases'

export interface DeletePostRepository {
  delete: (
    id: DeletePostRepository.Params,
  ) => Promise<DeletePostRepository.Model>
}

export namespace DeletePostRepository {
  export type Params = DeletePost.Params
  export type Model = DeletePost.Model
}
