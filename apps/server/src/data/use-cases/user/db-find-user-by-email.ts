import { FindUserByEmailRepository } from '@server/data/protocols/db'
import { FindUserByEmail } from '@server/domain/use-cases'

export class DbFindUserByEmail implements FindUserByEmail {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  async find(params: FindUserByEmail.Params): Promise<FindUserByEmail.Model> {
    const user = await this.findUserByEmailRepository.findByEmail(params)
    if (!user) throw new Error('User not found')
    return user
  }
}
