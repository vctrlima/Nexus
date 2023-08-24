export interface HandleRefreshToken {
  handle: (
    params: HandleRefreshToken.Params,
  ) => Promise<HandleRefreshToken.Model>
}

export namespace HandleRefreshToken {
  export type Params = {
    refreshToken: string
  }

  export type Model = {
    accessToken: string
    refreshToken: string
  }
}
