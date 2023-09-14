import { Decrypter } from '@server/data/protocols/cryptography'
import { FindUserById, FindUserByToken } from '@server/domain/use-cases'
import env from '@server/main/config/env'

export class DbFindUserByToken implements FindUserByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly findUserById: FindUserById,
  ) {}

  async findUserByToken(
    accessToken: FindUserByToken.Params,
  ): Promise<FindUserByToken.Model> {
    const { id: userId } = await this.decrypter.decrypt({
      cipherText: accessToken,
      secret: env.jwtAccessTokenSecret,
    })
    const user = await this.findUserById.find(userId)
    if (!user) throw new Error('User not found')
    return user
  }
}
