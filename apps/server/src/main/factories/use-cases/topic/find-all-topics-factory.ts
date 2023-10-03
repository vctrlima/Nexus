import { DbFindAllTopics } from '@server/data/use-cases';
import { FindAllTopics } from '@server/domain/use-cases';
import { PrismaTopicRepository, prisma } from '@server/infra/db';

export const makeFindAllTopics = (): FindAllTopics =>
  new DbFindAllTopics(new PrismaTopicRepository(prisma));
