import { DbUpdatePost } from '@/data/use-cases'
import { UpdatePost } from '@/domain/use-cases'
import { PrismaPostRepository, prisma } from '@/infra/db'

export const makeUpdatePost = (): UpdatePost =>
  new DbUpdatePost(new PrismaPostRepository(prisma))
