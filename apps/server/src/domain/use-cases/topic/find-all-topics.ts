import { Topic } from '@server/domain/entities';

export interface FindAllTopics {
  findAll: () => Promise<FindAllTopics.Model>;
}

export namespace FindAllTopics {
  export type Model = Topic[];
}
