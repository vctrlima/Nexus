import { DbDeleteLike } from '@server/data/use-cases';
import { DeleteLike } from '@server/domain/use-cases';
import { PrismaLikeRepository, prisma } from '@server/infra/db';

export const makeDeleteLike = (): DeleteLike =>
  new DbDeleteLike(new PrismaLikeRepository(prisma));
