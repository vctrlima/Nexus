import { CreateTopic } from '@server/domain/use-cases';

export interface CreateTopicRepository {
  create: (
    topic: CreateTopicRepository.Params
  ) => Promise<CreateTopicRepository.Model>;
}

export namespace CreateTopicRepository {
  export type Params = CreateTopic.Params;
  export type Model = CreateTopic.Model;
}
