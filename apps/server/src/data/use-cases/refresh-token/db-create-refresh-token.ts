import { CreateRefreshTokenRepository } from '@server/data/protocols/db'
import { CreateRefreshToken } from '@server/domain/use-cases'

export class DbCreateRefreshToken implements CreateRefreshToken {
  constructor(
    private readonly createRefreshTokenRepository: CreateRefreshTokenRepository,
  ) {}

  async create(
    params: CreateRefreshToken.Params,
  ): Promise<CreateRefreshToken.Model> {
    return await this.createRefreshTokenRepository.create(params)
  }
}
