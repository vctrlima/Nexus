import { UserRepository } from '@/data/protocols/db'
import { UpdateUser } from '@/domain/use-cases'

export class DbUpdateUser implements UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async update(params: UpdateUser.Params): Promise<UpdateUser.Model> {
    return await this.userRepository.update(params)
  }
}
