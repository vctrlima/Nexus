import { User } from '@/domain/entities'

export interface AuthenticateUser {
  auth: (params: AuthenticateUser.Params) => Promise<AuthenticateUser.Model>
}

export namespace AuthenticateUser {
  export type Params = {
    email: string
    password: string
  }

  export type Model = {
    accessToken: string
    refreshToken: string
    user: Partial<User>
  }
}
