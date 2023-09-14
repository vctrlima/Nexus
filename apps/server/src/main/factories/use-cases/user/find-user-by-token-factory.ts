import { DbFindUserByToken } from '@server/data/use-cases'
import { FindUserByToken } from '@server/domain/use-cases'
import { JwtAdapter } from '@server/infra/cryptography'
import { makeFindUserById } from './find-user-by-id-factory'

export const makeFindUserByToken = (): FindUserByToken => {
  const findUserById = makeFindUserById()
  const jwtAdapter = new JwtAdapter()
  return new DbFindUserByToken(jwtAdapter, findUserById)
}
