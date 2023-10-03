import { CreateLike } from '@server/domain/use-cases';

export interface CreateLikeRepository {
  create: (
    like: CreateLikeRepository.Params
  ) => Promise<CreateLikeRepository.Model>;
}

export namespace CreateLikeRepository {
  export type Params = CreateLike.Params;
  export type Model = CreateLike.Model;
}
