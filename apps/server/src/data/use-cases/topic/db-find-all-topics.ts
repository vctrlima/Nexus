import { FindAllTopicsRepository } from '@server/data/protocols/db';
import { FindAllTopics } from '@server/domain/use-cases';

export class DbFindAllTopics implements FindAllTopics {
  constructor(
    private readonly findAllTopicsRepository: FindAllTopicsRepository
  ) {}

  async findAll(): Promise<FindAllTopics.Model> {
    return await this.findAllTopicsRepository.findAll();
  }
}
