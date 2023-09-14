import { DbFindPostById } from '@server/data/use-cases'
import { FindPostById } from '@server/domain/use-cases'
import { PrismaPostRepository, prisma } from '@server/infra/db'

export const makeFindPostById = (): FindPostById =>
  new DbFindPostById(new PrismaPostRepository(prisma))
