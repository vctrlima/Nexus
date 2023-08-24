import { RefreshTokenRepository } from '@/data/protocols/db'
import { FindRefreshTokenById } from '@/domain/use-cases'

export class DbFindRefreshTokenById implements FindRefreshTokenById {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async find(
    id: FindRefreshTokenById.Params,
  ): Promise<FindRefreshTokenById.Model> {
    return await this.refreshTokenRepository.findById(id)
  }
}
