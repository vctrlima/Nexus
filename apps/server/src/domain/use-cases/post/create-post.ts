import { Post } from '@server/domain/entities'

export interface CreatePost {
  create: (params: CreatePost.Params) => Promise<CreatePost.Model>
}

export namespace CreatePost {
  export type Params = Post
  export interface Model {
    id: string
  }
}
