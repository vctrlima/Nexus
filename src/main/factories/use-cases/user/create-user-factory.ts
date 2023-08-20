import { DbCreateUser } from '@/data/use-cases'
import { CreateUser } from '@/domain/use-cases'
import { BcryptAdapter } from '@/infra/cryptography'
import { PrismaUserRepository, prisma } from '@/infra/db'
import env from '@/main/config/env'

export const makeCreateUser = (): CreateUser => {
  const bcryptAdapter = new BcryptAdapter(env.passwordHashSalt)
  const prismaUserRepository = new PrismaUserRepository(prisma)
  return new DbCreateUser(prismaUserRepository, bcryptAdapter)
}
