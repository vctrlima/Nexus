import { Like } from '@server/domain/entities';

export interface CreateLike {
  create: (params: CreateLike.Params) => Promise<CreateLike.Model>;
}

export namespace CreateLike {
  export type Params = Like;
  export type Model = Like;
}
