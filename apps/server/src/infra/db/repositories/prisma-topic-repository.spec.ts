import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import {
  CreateTopicRepository,
  FindAllTopicsRepository,
} from '@server/data/protocols/db';
import { Topic } from '@server/domain/entities';
import { PrismaTopicRepository } from './prisma-topic-repository';

type TopicRepository = CreateTopicRepository & FindAllTopicsRepository;

const prismaClientMock = (): PrismaClient =>
  ({
    topic: {
      create: jest.fn(),
      findMany: jest.fn(),
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

  describe('findAll', () => {
    it('should find all topics', async () => {
      const topics = [
        {
          id: faker.string.uuid(),
          label: faker.lorem.word(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: faker.string.uuid(),
          label: faker.lorem.word(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.topic, 'findMany').mockResolvedValue(topics);
      const topicsFound = topics.map((topic) => new Topic({ ...topic }));

      const result = await prismaTopicRepository.findAll();

      expect(prisma.topic.findMany).toHaveBeenCalledWith({
        orderBy: { label: 'asc' },
      });
      expect(result).toStrictEqual(topicsFound);
    });
  });
});
