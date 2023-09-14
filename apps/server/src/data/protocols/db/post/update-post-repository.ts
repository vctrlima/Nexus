import { UpdatePost } from '@server/domain/use-cases'

export interface UpdatePostRepository {
  update: (
    post: UpdatePostRepository.Params,
  ) => Promise<UpdatePostRepository.Model>
}

export namespace UpdatePostRepository {
  export type Params = UpdatePost.Params
  export type Model = UpdatePost.Model
}
