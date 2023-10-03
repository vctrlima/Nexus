import { FindAllTopics } from '@server/domain/use-cases';

export interface FindAllTopicsRepository {
  findAll: () => Promise<FindAllTopicsRepository.Model>;
}

export namespace FindAllTopicsRepository {
  export type Model = FindAllTopics.Model;
}
