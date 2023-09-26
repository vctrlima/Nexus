import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { CreateTopicRepository } from '@server/data/protocols/db';
import { Topic } from '@server/domain/entities';
import { PrismaTopicRepository } from './prisma-topic-repository';

type TopicRepository = CreateTopicRepository;

const prismaClientMock = (): PrismaClient =>
  ({
    topic: {
      create: jest.fn(),
    },
  } as any);

describe('PrismaTopicRepository', () => {
  let prisma: PrismaClient;
  let prismaTopicRepository: TopicRepository;

  beforeEach(() => {
    prisma = prismaClientMock();
    prismaTopicRepository = new PrismaTopicRepository(prisma);
  });

  describe('create', () => {
    it('should create a new topic', async () => {
      const newTopic = { label: faker.lorem.word() };
      const createdTopic = {
        id: faker.string.uuid(),
        label: newTopic.label,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.topic, 'create').mockResolvedValue(createdTopic);
      const createdTopicReturn = new Topic({ ...createdTopic });

      const result = await prismaTopicRepository.create(newTopic);

      expect(prisma.topic.create).toHaveBeenCalledWith({
        data: { label: newTopic.label },
      });
      expect(result).toStrictEqual(createdTopicReturn);
    });
  });
});
