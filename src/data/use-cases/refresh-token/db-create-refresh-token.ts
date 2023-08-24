import { RefreshTokenRepository } from '@/data/protocols/db'
import { CreateRefreshToken } from '@/domain/use-cases'

export class DbCreateRefreshToken implements CreateRefreshToken {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async create(
    params: CreateRefreshToken.Params,
  ): Promise<CreateRefreshToken.Model> {
    return await this.refreshTokenRepository.create(params)
  }
}
