import { PostRepository } from '@/data/protocols/db'
import { CreatePost } from '@/domain/use-cases'

export class DbCreatePost implements CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async create(params: CreatePost.Params): CreatePost.Model {
    return await this.postRepository.create(params)
  }
}
