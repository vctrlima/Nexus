import { DeleteUserRepository } from '@/data/protocols/db'
import { DeleteUser } from '@/domain/use-cases'

export class DbDeleteUser implements DeleteUser {
  constructor(private readonly deleteUserRepository: DeleteUserRepository) {}

  async delete(id: string): Promise<void> {
    await this.deleteUserRepository.delete(id)
  }
}
