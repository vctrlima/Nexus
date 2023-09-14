import { FindRefreshTokenByIdRepository } from '@server/data/protocols/db'
import { FindRefreshTokenById } from '@server/domain/use-cases'

export class DbFindRefreshTokenById implements FindRefreshTokenById {
  constructor(
    private readonly findRefreshTokenByIdRepository: FindRefreshTokenByIdRepository,
  ) {}

  async find(
    id: FindRefreshTokenById.Params,
  ): Promise<FindRefreshTokenById.Model> {
    return await this.findRefreshTokenByIdRepository.findById(id)
  }
}
