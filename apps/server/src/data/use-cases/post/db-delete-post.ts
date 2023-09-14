import { DeletePostRepository } from '@server/data/protocols/db'
import { DeletePost } from '@server/domain/use-cases'

export class DbDeletePost implements DeletePost {
  constructor(private readonly deletePostRepository: DeletePostRepository) {}

  async delete(id: string): Promise<void> {
    await this.deletePostRepository.delete(id)
  }
}
