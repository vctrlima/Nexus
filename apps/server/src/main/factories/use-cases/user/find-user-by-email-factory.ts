import { DbFindUserByEmail } from '@server/data/use-cases'
import { FindUserByEmail } from '@server/domain/use-cases'
import { PrismaUserRepository, prisma } from '@server/infra/db'

export const makeFindUserByEmail = (): FindUserByEmail =>
  new DbFindUserByEmail(new PrismaUserRepository(prisma))
