import { User } from './user'

export class RefreshToken {
  public id?: string
  public readonly hashedToken: string
  public readonly user?: User
  public readonly revoked: boolean
  public readonly createdAt?: Date
  public readonly updatedAt?: Date

  constructor(params: {
    id?: string
    hashedToken: string
    user?: User
    revoked?: boolean
  }) {
    this.id = params.id
    this.hashedToken = params.hashedToken
    this.user = params.user ?? undefined
    this.revoked = params.revoked ?? false
  }
}
