import { UserRepository } from '@/data/protocols/db'
import { FindUserById } from '@/domain/use-cases'

export class DbFindUserById implements FindUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async find(id: FindUserById.Params): Promise<FindUserById.Model> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new Error('User not found')
    return user
  }
}
