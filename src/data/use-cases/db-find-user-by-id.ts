import { UserRepository } from '@/data/protocols/db'
import { FindUserById } from '@/domain/use-cases'

export class DbFindUserById implements FindUserById {
  constructor(private readonly userRepository: UserRepository) {}

  async find(id: FindUserById.Params): FindUserById.Model {
    return await this.userRepository.findById(id)
  }
}
