import { DbCreateLike } from '@server/data/use-cases';
import { CreateLike } from '@server/domain/use-cases';
import { PrismaLikeRepository, prisma } from '@server/infra/db';

export const makeCreateLike = (): CreateLike =>
  new DbCreateLike(new PrismaLikeRepository(prisma));
