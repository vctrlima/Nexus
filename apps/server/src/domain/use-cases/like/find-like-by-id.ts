import { Like } from '@server/domain/entities';

export interface FindLikeById {
  findById: (id: FindLikeById.Params) => Promise<FindLikeById.Model>;
}

export namespace FindLikeById {
  export type Params = string;
  export type Model = Like;
}
