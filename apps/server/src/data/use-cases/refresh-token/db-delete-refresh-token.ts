import { DeleteRefreshTokenRepository } from '@server/data/protocols/db'
import { DeleteRefreshToken } from '@server/domain/use-cases'

export class DbDeleteRefreshToken implements DeleteRefreshToken {
  constructor(
    private readonly deleteRefreshTokenRepository: DeleteRefreshTokenRepository,
  ) {}

  async delete(
    id: DeleteRefreshToken.Params,
  ): Promise<DeleteRefreshToken.Model> {
    return await this.deleteRefreshTokenRepository.delete(id)
  }
}
