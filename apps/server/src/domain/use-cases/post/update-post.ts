import { Post } from '@server/domain/entities'

export interface UpdatePost {
  update: (params: UpdatePost.Params) => Promise<UpdatePost.Model>
}

export namespace UpdatePost {
  export type Params = Post
  export type Model = Post
}
