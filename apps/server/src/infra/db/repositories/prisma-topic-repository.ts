import { PrismaClient } from '@prisma/client';
import { CreateTopicRepository } from '@server/data/protocols/db';
import { Topic } from '@server/domain/entities';
import { CreateTopic } from '@server/domain/use-cases';

export class PrismaTopicRepository implements CreateTopicRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(params: CreateTopic.Params): Promise<Topic> {
    const { id, label, createdAt, updatedAt } = await this.prisma.topic.create({
      data: {
        label: params.label,
      },
    });
    return new Topic({ id, label, createdAt, updatedAt });
  }
}
