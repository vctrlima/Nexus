import { DbUpdatePost } from '@server/data/use-cases'
import { UpdatePost } from '@server/domain/use-cases'
import { PrismaPostRepository, prisma } from '@server/infra/db'

export const makeUpdatePost = (): UpdatePost =>
  new DbUpdatePost(new PrismaPostRepository(prisma))
