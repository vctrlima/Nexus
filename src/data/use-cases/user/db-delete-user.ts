import { UserRepository } from '@/data/protocols/db'
import { DeleteUser } from '@/domain/use-cases'

export class DbDeleteUser implements DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
