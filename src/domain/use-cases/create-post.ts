import { Post } from '@/domain/entities'

export interface CreatePost {
  create: (params: CreatePost.Params) => CreatePost.Model
}

export namespace CreatePost {
  export type Params = Post
  export type Model = Promise<{ id: string }>
}
