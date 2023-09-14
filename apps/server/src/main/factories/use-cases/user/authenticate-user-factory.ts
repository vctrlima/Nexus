import { DbAuthenticateUser } from '@server/data/use-cases'
import { AuthenticateUser } from '@server/domain/use-cases'
import { BcryptAdapter, JwtAdapter } from '@server/infra/cryptography'
import { PrismaUserRepository, prisma } from '@server/infra/db'
import env from '@server/main/config/env'
import { makeCreateRefreshToken } from '@server/main/factories/use-cases'

export const makeAuthenticateUser = (): AuthenticateUser => {
  const prismaUserRepository = new PrismaUserRepository(prisma)
  const createRefreshToken = makeCreateRefreshToken()
  const bcryptAdapter = new BcryptAdapter(env.passwordHashSalt)
  const jwtAdapter = new JwtAdapter()
  return new DbAuthenticateUser(
    prismaUserRepository,
    createRefreshToken,
    bcryptAdapter,
    jwtAdapter,
  )
}
