import { UpdatePostRepository } from '@/data/protocols/db'
import { UpdatePost } from '@/domain/use-cases'

export class DbUpdatePost implements UpdatePost {
  constructor(private readonly updatePostRepository: UpdatePostRepository) {}

  async update(params: UpdatePost.Params): Promise<UpdatePost.Model> {
    return await this.updatePostRepository.update(params)
  }
}
