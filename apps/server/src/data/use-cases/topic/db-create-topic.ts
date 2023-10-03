import { CreateTopicRepository } from '@server/data/protocols/db';
import { CreateTopic } from '@server/domain/use-cases';

export class DbCreateTopic implements CreateTopic {
  constructor(private readonly createTopicRepository: CreateTopicRepository) {}

  async create(params: CreateTopic.Params): Promise<CreateTopic.Model> {
    return await this.createTopicRepository.create(params);
  }
}
