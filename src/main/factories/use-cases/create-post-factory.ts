import { DbCreatePost } from '@/data/use-cases'
import { CreatePost } from '@/domain/use-cases'
import { PrismaPostRepository, prisma } from '@/infra/db'

export const makeCreatePost = (): CreatePost =>
  new DbCreatePost(new PrismaPostRepository(prisma))
