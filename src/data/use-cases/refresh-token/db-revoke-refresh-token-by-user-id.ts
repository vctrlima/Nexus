import { RevokeRefreshTokenByUserIdRepository } from '@/data/protocols/db'
import { RevokeRefreshTokenByUserId } from '@/domain/use-cases'

export class DbRevokeRefreshTokenByUserId
  implements RevokeRefreshTokenByUserId
{
  constructor(
    private readonly revokeRefreshTokenByUserIdRepository: RevokeRefreshTokenByUserIdRepository,
  ) {}

  async revokeByUserId(
    userId: RevokeRefreshTokenByUserId.Params,
  ): Promise<RevokeRefreshTokenByUserId.Model> {
    return await this.revokeRefreshTokenByUserIdRepository.revokeByUserId(
      userId,
    )
  }
}
