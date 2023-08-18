import { DbFindUserById } from '@/data/use-cases'
import { FindUserById } from '@/domain/use-cases'
import { PrismaUserRepository, prisma } from '@/infra/db'

export const makeFindUserById = (): FindUserById =>
  new DbFindUserById(new PrismaUserRepository(prisma))
