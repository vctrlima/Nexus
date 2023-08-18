import { DbCreateUser } from '@/data/use-cases'
import { CreateUser } from '@/domain/use-cases'
import { PrismaUserRepository, prisma } from '@/infra/db'

export const makeCreateUser = (): CreateUser =>
  new DbCreateUser(new PrismaUserRepository(prisma))
