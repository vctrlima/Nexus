import { DbAuthenticateUser } from '@/data/use-cases'
import { AuthenticateUser } from '@/domain/use-cases'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { PrismaUserRepository, prisma } from '@/infra/db'
import env from '@/main/config/env'
import { makeCreateRefreshToken } from '@/main/factories/use-cases'

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
