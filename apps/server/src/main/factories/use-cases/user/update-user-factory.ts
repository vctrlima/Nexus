import { DbUpdateUser } from '@server/data/use-cases'
import { UpdateUser } from '@server/domain/use-cases'
import { BcryptAdapter } from '@server/infra/cryptography'
import { PrismaUserRepository, prisma } from '@server/infra/db'
import env from '@server/main/config/env'

export const makeUpdateUser = (): UpdateUser => {
  const bcryptAdapter = new BcryptAdapter(env.passwordHashSalt)
  const prismaUserRepository = new PrismaUserRepository(prisma)
  return new DbUpdateUser(prismaUserRepository, bcryptAdapter)
}
