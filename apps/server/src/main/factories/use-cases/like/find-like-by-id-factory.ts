import { DbFindLikeById } from '@server/data/use-cases';
import { FindLikeById } from '@server/domain/use-cases';
import { PrismaLikeRepository, prisma } from '@server/infra/db';

export const makeFindLikeById = (): FindLikeById =>
  new DbFindLikeById(new PrismaLikeRepository(prisma));
