import { DbFindUserByEmail } from '@/data/use-cases'
import { FindUserByEmail } from '@/domain/use-cases'
import { PrismaUserRepository, prisma } from '@/infra/db'

export const makeFindUserByEmail = (): FindUserByEmail =>
  new DbFindUserByEmail(new PrismaUserRepository(prisma))
