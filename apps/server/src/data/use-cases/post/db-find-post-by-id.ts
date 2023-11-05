import { FindPostByIdRepository } from '@server/data/protocols/db';
import { FindPostById } from '@server/domain/use-cases';

export class DbFindPostById implements FindPostById {
  constructor(
    private readonly findPostByIdRepository: FindPostByIdRepository
  ) {}

  async findById(params: FindPostById.Params): Promise<FindPostById.Model> {
    return await this.findPostByIdRepository.findById(params);
  }
}
