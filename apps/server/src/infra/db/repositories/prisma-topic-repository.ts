import { PrismaClient } from '@prisma/client';
import {
  CreateTopicRepository,
  FindAllTopicsRepository,
} from '@server/data/protocols/db';
import { Topic } from '@server/domain/entities';
import { CreateTopic, FindAllTopics } from '@server/domain/use-cases';

export class PrismaTopicRepository
  implements CreateTopicRepository, FindAllTopicsRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(params: CreateTopic.Params): Promise<Topic> {
    const { id, label, createdAt, updatedAt } = await this.prisma.topic.create({
      data: {
        label: params.label,
      },
    });
    return new Topic({ id, label, createdAt, updatedAt });
  }

  async findAll(): Promise<FindAllTopics.Model> {
    const topics = await this.prisma.topic.findMany({
      orderBy: { label: 'asc' },
    });
    return topics.map((topic) => new Topic({ ...topic }));
  }
}
