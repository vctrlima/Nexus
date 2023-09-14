import { Decrypter, Encrypter } from '@server/data/protocols/cryptography'
import {
  CreateRefreshToken,
  DeleteRefreshToken,
  FindRefreshTokenById,
  FindUserById,
  HandleRefreshToken,
} from '@server/domain/use-cases'
import { uuidV4 } from '@server/helpers/string'
import env from '@server/main/config/env'
import { UnauthorizedError } from '@server/presentation/errors'

export class DbHandleRefreshToken implements HandleRefreshToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly encrypter: Encrypter,
    private readonly findRefreshTokenById: FindRefreshTokenById,
    private readonly findUserById: FindUserById,
    private readonly deleteRefreshToken: DeleteRefreshToken,
    private readonly createRefreshToken: CreateRefreshToken,
  ) {}

  async handle({
    refreshToken,
  }: HandleRefreshToken.Params): Promise<HandleRefreshToken.Model> {
    const payload = await this.decrypter.decrypt({
      cipherText: refreshToken,
      secret: env.jwtRefreshTokenSecret,
    })
    const savedRefreshToken = await this.findRefreshTokenById.find(payload.jti)
    if (
      !savedRefreshToken ||
      !savedRefreshToken.id ||
      !savedRefreshToken.user ||
      !savedRefreshToken.user.id ||
      savedRefreshToken.revoked === true
    ) {
      throw new UnauthorizedError()
    }
    const user = await this.findUserById.find(savedRefreshToken.user.id)
    if (!user || !user.id) throw new UnauthorizedError()
    await this.deleteRefreshToken.delete(savedRefreshToken.id)
    const jti = uuidV4()
    const newRefreshToken = await this.encrypter.encrypt({
      plainText: user.id,
      secret: env.jwtRefreshTokenSecret,
      expiresIn: '7d',
      jti,
    })
    await this.createRefreshToken.create({
      jti,
      userId: user.id,
      refreshToken: newRefreshToken,
    })
    const accessToken = await this.encrypter.encrypt({
      plainText: user.id,
      secret: env.jwtAccessTokenSecret,
    })
    return { accessToken, refreshToken: newRefreshToken }
  }
}
