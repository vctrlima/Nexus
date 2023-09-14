import { DbDeletePost } from '@server/data/use-cases'
import { DeletePost } from '@server/domain/use-cases'
import { PrismaPostRepository, prisma } from '@server/infra/db'

export const makeDeletePost = (): DeletePost =>
  new DbDeletePost(new PrismaPostRepository(prisma))
