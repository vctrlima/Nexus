import { DeletePostRepository } from '@/data/protocols/db'
import { DeletePost } from '@/domain/use-cases'

export class DbDeletePost implements DeletePost {
  constructor(private readonly deletePostRepository: DeletePostRepository) {}

  async delete(id: string): Promise<void> {
    await this.deletePostRepository.delete(id)
  }
}
