import { FindLikeByIdRepository } from '@server/data/protocols/db';
import { FindLikeById } from '@server/domain/use-cases';

export class DbFindLikeById implements FindLikeById {
  constructor(
    private readonly findLikeByIdRepository: FindLikeByIdRepository
  ) {}

  async findById(id: FindLikeById.Params): Promise<FindLikeById.Model> {
    return await this.findLikeByIdRepository.findById(id);
  }
}
