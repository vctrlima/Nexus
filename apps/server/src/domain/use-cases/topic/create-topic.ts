import { Topic } from '@server/domain/entities';

export interface CreateTopic {
  create: (data: CreateTopic.Params) => Promise<CreateTopic.Model>;
}

export namespace CreateTopic {
  export interface Params {
    label: string;
  }

  export type Model = Topic;
}
