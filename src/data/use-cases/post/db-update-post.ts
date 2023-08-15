import { PostRepository } from '@/data/protocols/db'
import { UpdatePost } from '@/domain/use-cases'

export class DbUpdatePost implements UpdatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async update(params: UpdatePost.Params): Promise<UpdatePost.Model> {
    return await this.postRepository.update(params)
  }
}
