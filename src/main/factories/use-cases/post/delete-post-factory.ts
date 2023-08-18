import { DbDeletePost } from '@/data/use-cases'
import { DeletePost } from '@/domain/use-cases'
import { PrismaPostRepository, prisma } from '@/infra/db'

export const makeDeletePost = (): DeletePost =>
  new DbDeletePost(new PrismaPostRepository(prisma))
