import { DbFindPostsByParams } from '@server/data/use-cases';
import { FindPostsByParams } from '@server/domain/use-cases';
import { PrismaPostRepository, prisma } from '@server/infra/db';

export const makeFindPostsByParams = (): FindPostsByParams =>
  new DbFindPostsByParams(new PrismaPostRepository(prisma));
