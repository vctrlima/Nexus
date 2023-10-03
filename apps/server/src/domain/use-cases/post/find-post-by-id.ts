import { Post } from '@server/domain/entities';

export interface FindPostById {
  findById: (id: FindPostById.Params) => Promise<FindPostById.Model>;
}

export namespace FindPostById {
  export type Params = string;
  export type Model = Post;
}
