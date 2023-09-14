export interface DeletePost {
  delete: (id: DeletePost.Params) => Promise<DeletePost.Model>
}

export namespace DeletePost {
  export type Params = string
  export type Model = void
}
