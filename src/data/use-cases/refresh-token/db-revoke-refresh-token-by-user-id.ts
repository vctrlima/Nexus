import { RefreshTokenRepository } from '@/data/protocols/db'
import { RevokeRefreshTokenByUserId } from '@/domain/use-cases'

export class DbRevokeRefreshTokenByUserId
  implements RevokeRefreshTokenByUserId
{
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async revokeByUserId(
    userId: RevokeRefreshTokenByUserId.Params,
  ): Promise<RevokeRefreshTokenByUserId.Model> {
    return await this.refreshTokenRepository.revokeByUserId(userId)
  }
}
