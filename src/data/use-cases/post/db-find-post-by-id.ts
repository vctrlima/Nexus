import { FindPostByIdRepository } from '@/data/protocols/db'
import { FindPostById } from '@/domain/use-cases'

export class DbFindPostById implements FindPostById {
  constructor(
    private readonly findPostByIdRepository: FindPostByIdRepository,
  ) {}

  async find(id: FindPostById.Params): Promise<FindPostById.Model> {
    return await this.findPostByIdRepository.findById(id)
  }
}
