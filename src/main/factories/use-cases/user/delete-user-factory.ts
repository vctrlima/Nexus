import { DbDeleteUser } from '@/data/use-cases'
import { DeleteUser } from '@/domain/use-cases'
import { PrismaUserRepository, prisma } from '@/infra/db'

export const makeDeleteUser = (): DeleteUser =>
  new DbDeleteUser(new PrismaUserRepository(prisma))
