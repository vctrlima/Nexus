import { DbHandleRefreshToken } from '@server/data/use-cases'
import { HandleRefreshToken } from '@server/domain/use-cases'
import { JwtAdapter } from '@server/infra/cryptography'
import { makeFindUserById } from '@server/main/factories/use-cases'
import { makeCreateRefreshToken } from './create-refresh-token-factory'
import { makeDeleteRefreshToken } from './delete-refresh-token-factory'
import { makeFindRefreshTokenById } from './find-refresh-token-by-id-factory'

export const makeHandleRefreshToken = (): HandleRefreshToken => {
  const jwtAdapter = new JwtAdapter()
  const dbFindRefreshTokenById = makeFindRefreshTokenById()
  const dbFindUserById = makeFindUserById()
  const dbDeleteRefreshToken = makeDeleteRefreshToken()
  const dbCreateRefreshToken = makeCreateRefreshToken()
  return new DbHandleRefreshToken(
    jwtAdapter,
    jwtAdapter,
    dbFindRefreshTokenById,
    dbFindUserById,
    dbDeleteRefreshToken,
    dbCreateRefreshToken,
  )
}
