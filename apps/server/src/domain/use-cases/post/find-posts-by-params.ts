import { Post } from '@server/domain/entities';

export interface FindPostsByParams {
  findManyByParams: (
    params: FindPostsByParams.Params
  ) => Promise<FindPostsByParams.Model>;
}

export namespace FindPostsByParams {
  export interface Params {
    keywords?: string;
    topics?: string[];
    skip?: number;
    take?: number;
    user?: { id: string };
  }

  export type Model = Post[];
}
