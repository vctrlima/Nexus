import { DbFindPostById } from '@/data/use-cases'
import { FindPostById } from '@/domain/use-cases'
import { PrismaPostRepository, prisma } from '@/infra/db'

export const makeFindPostById = (): FindPostById =>
  new DbFindPostById(new PrismaPostRepository(prisma))
