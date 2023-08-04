import { UserRepository } from '@/data/protocols/db'
import { CreateUser } from '@/domain/use-cases'

export class DbCreateUser implements CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async create(params: CreateUser.Params): CreateUser.Model {
    return await this.userRepository.create(params)
  }
}
