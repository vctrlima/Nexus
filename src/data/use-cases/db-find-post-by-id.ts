import { PostRepository } from '@/data/protocols/db'
import { FindPostById } from '@/domain/use-cases'

export class DbFindPostById implements FindPostById {
  constructor(private readonly postRepository: PostRepository) {}

  async find(id: FindPostById.Params): Promise<FindPostById.Model> {
    return await this.postRepository.findById(id)
  }
}
