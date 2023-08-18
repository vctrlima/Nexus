export interface DeleteUser {
  delete: (id: DeleteUser.Params) => Promise<DeleteUser.Model>
}

export namespace DeleteUser {
  export type Params = string
  export type Model = void
}
