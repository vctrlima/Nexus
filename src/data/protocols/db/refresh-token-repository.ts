import { RefreshToken } from '@/domain/entities'

export interface RefreshTokenRepository {
  create: (params: {
    jti: string
    refreshToken: string
    userId: string
  }) => Promise<RefreshToken>
  findById: (id: string) => Promise<RefreshToken>
  delete: (id: string) => Promise<void>
  revokeByUserId: (userId: string) => Promise<void>
}
