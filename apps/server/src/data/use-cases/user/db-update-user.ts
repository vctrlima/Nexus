import { Hasher } from '@server/data/protocols/cryptography'
import { UpdateUserRepository } from '@server/data/protocols/db'
import { UpdateUser } from '@server/domain/use-cases'

export class DbUpdateUser implements UpdateUser {
  constructor(
    private readonly updateUserRepository: UpdateUserRepository,
    private readonly hasher: Hasher,
  ) {}

  async update(params: UpdateUser.Params): Promise<UpdateUser.Model> {
    params.password = await this.hasher.hash(params.password)
    return await this.updateUserRepository.update(params)
  }
}
