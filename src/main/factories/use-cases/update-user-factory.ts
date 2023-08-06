import { DbUpdateUser } from '@/data/use-cases'
import { UpdateUser } from '@/domain/use-cases'
import { PrismaUserRepository, prisma } from '@/infra/db'

export const makeUpdateUser = (): UpdateUser =>
  new DbUpdateUser(new PrismaUserRepository(prisma))
