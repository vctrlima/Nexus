export interface RevokeRefreshTokenByUserId {
  revokeByUserId: (
    userId: RevokeRefreshTokenByUserId.Params,
  ) => Promise<RevokeRefreshTokenByUserId.Model>
}

export namespace RevokeRefreshTokenByUserId {
  export type Params = string
  export type Model = void
}
