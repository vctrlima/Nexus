import { FindUserByIdRepository } from '@server/data/protocols/db'
import { FindUserById } from '@server/domain/use-cases'

export class DbFindUserById implements FindUserById {
  constructor(
    private readonly findUserByIdRepository: FindUserByIdRepository,
  ) {}

  async find(id: FindUserById.Params): Promise<FindUserById.Model> {
    const user = await this.findUserByIdRepository.findById(id)
    if (!user) throw new Error('User not found')
    return user
  }
}
