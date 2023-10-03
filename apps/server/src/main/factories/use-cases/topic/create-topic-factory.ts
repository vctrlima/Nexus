import { DbCreateTopic } from '@server/data/use-cases/topic';
import { CreateTopic } from '@server/domain/use-cases';
import { PrismaTopicRepository, prisma } from '@server/infra/db';

export const makeCreateTopic = (): CreateTopic =>
  new DbCreateTopic(new PrismaTopicRepository(prisma));
