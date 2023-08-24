export interface DeleteRefreshToken {
  delete: (id: DeleteRefreshToken.Params) => Promise<DeleteRefreshToken.Model>
}

export namespace DeleteRefreshToken {
  export type Params = string
  export type Model = void
}
