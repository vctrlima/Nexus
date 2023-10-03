import { FindPostsByParamsRepository } from '@server/data/protocols/db';
import { FindPostsByParams } from '@server/domain/use-cases';

export class DbFindPostsByParams implements FindPostsByParams {
  constructor(
    private readonly findPostsByParamsRepository: FindPostsByParamsRepository
  ) {}

  async findManyByParams(
    params: FindPostsByParams.Params
  ): Promise<FindPostsByParams.Model> {
    return await this.findPostsByParamsRepository.findManyByParams(params);
  }
}
