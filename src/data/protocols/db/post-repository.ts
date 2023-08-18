import { Post } from '@/domain/entities'

export interface PostRepository {
  create?: (post: Post) => Promise<{ id: string }>
  findById?: (id: string) => Promise<Post>
  update?: (post: Post) => Promise<Post>
  delete?: (id: string) => Promise<void>
}
