import { DbFindUserById } from '@server/data/use-cases'
import { FindUserById } from '@server/domain/use-cases'
import { PrismaUserRepository, prisma } from '@server/infra/db'

export const makeFindUserById = (): FindUserById =>
  new DbFindUserById(new PrismaUserRepository(prisma))
