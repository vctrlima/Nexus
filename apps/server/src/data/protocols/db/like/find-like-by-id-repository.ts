import { FindLikeById } from '@server/domain/use-cases';

export interface FindLikeByIdRepository {
  findById: (
    id: FindLikeByIdRepository.Params
  ) => Promise<FindLikeByIdRepository.Model>;
}

export namespace FindLikeByIdRepository {
  export type Params = FindLikeById.Params;
  export type Model = FindLikeById.Model;
}
