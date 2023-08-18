import { PostRepository } from '@/data/protocols/db'
import { DeletePost } from '@/domain/use-cases'

export class DbDeletePost implements DeletePost {
  constructor(private readonly postRepository: PostRepository) {}

  async delete(id: string): Promise<void> {
    await this.postRepository.delete(id)
  }
}
