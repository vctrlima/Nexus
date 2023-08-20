import { DbUpdateUser } from '@/data/use-cases'
import { UpdateUser } from '@/domain/use-cases'
import { BcryptAdapter } from '@/infra/cryptography'
import { PrismaUserRepository, prisma } from '@/infra/db'
import env from '@/main/config/env'

export const makeUpdateUser = (): UpdateUser => {
  const bcryptAdapter = new BcryptAdapter(env.passwordHashSalt)
  const prismaUserRepository = new PrismaUserRepository(prisma)
  return new DbUpdateUser(prismaUserRepository, bcryptAdapter)
}
