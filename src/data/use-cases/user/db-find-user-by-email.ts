import { UserRepository } from '@/data/protocols/db'
import { FindUserByEmail } from '@/domain/use-cases'

export class DbFindUserByEmail implements FindUserByEmail {
  constructor(private readonly userRepository: UserRepository) {}

  async find(params: FindUserByEmail.Params): Promise<FindUserByEmail.Model> {
    const user = await this.userRepository.findByEmail(params)
    if (!user) throw new Error('User not found')
    return user
  }
}
