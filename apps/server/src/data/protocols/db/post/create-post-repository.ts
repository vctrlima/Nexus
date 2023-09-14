import { CreatePost } from '@server/domain/use-cases'

export interface CreatePostRepository {
  create: (
    post: CreatePostRepository.Params,
  ) => Promise<CreatePostRepository.Model>
}

export namespace CreatePostRepository {
  export type Params = CreatePost.Params
  export type Model = CreatePost.Model
}
