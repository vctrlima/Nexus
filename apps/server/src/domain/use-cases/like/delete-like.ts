export interface DeleteLike {
  delete: (id: DeleteLike.Params) => Promise<DeleteLike.Model>;
}

export namespace DeleteLike {
  export type Params = string;
  export type Model = void;
}
