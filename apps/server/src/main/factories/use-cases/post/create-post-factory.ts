import { DbCreatePost } from '@server/data/use-cases'
import { CreatePost } from '@server/domain/use-cases'
import { PrismaPostRepository, prisma } from '@server/infra/db'

export const makeCreatePost = (): CreatePost =>
  new DbCreatePost(new PrismaPostRepository(prisma))
