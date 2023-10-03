import { DeleteLike } from '@server/domain/use-cases';

export interface DeleteLikeRepository {
  delete: (
    id: DeleteLikeRepository.Params
  ) => Promise<DeleteLikeRepository.Model>;
}

export namespace DeleteLikeRepository {
  export type Params = DeleteLike.Params;
  export type Model = DeleteLike.Model;
}
