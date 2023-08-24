import { RefreshTokenRepository } from '@/data/protocols/db'
import { DeleteRefreshToken } from '@/domain/use-cases'

export class DbDeleteRefreshToken implements DeleteRefreshToken {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async delete(
    id: DeleteRefreshToken.Params,
  ): Promise<DeleteRefreshToken.Model> {
    return await this.refreshTokenRepository.delete(id)
  }
}
