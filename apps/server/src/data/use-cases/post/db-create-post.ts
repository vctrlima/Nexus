import { CreatePostRepository } from '@server/data/protocols/db'
import { CreatePost } from '@server/domain/use-cases'

export class DbCreatePost implements CreatePost {
  constructor(private readonly createPostRepository: CreatePostRepository) {}

  async create(params: CreatePost.Params): Promise<CreatePost.Model> {
    return await this.createPostRepository.create(params)
  }
}
