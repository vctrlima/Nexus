import { DbDeleteUser } from '@server/data/use-cases'
import { DeleteUser } from '@server/domain/use-cases'
import { PrismaUserRepository, prisma } from '@server/infra/db'

export const makeDeleteUser = (): DeleteUser =>
  new DbDeleteUser(new PrismaUserRepository(prisma))
