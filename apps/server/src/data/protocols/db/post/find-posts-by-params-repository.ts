import { FindPostsByParams } from '@server/domain/use-cases';

export interface FindPostsByParamsRepository {
  findManyByParams: (
    params: FindPostsByParamsRepository.Params
  ) => Promise<FindPostsByParamsRepository.Model>;
}

export namespace FindPostsByParamsRepository {
  export type Params = FindPostsByParams.Params;
  export type Model = FindPostsByParams.Model;
}
