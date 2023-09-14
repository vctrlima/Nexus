import { DbCreateUser } from '@server/data/use-cases'
import { CreateUser } from '@server/domain/use-cases'
import { BcryptAdapter } from '@server/infra/cryptography'
import { PrismaUserRepository, prisma } from '@server/infra/db'
import env from '@server/main/config/env'

export const makeCreateUser = (): CreateUser => {
  const bcryptAdapter = new BcryptAdapter(env.passwordHashSalt)
  const prismaUserRepository = new PrismaUserRepository(prisma)
  return new DbCreateUser(prismaUserRepository, bcryptAdapter)
}
