import { PrismaClient } from '@prisma/client';
import {
  CreateLikeRepository,
  DeleteLikeRepository,
  FindLikeByIdRepository,
} from '@server/data/protocols/db';
import { Like } from '@server/domain/entities';

export class PrismaLikeRepository
  implements CreateLikeRepository, FindLikeByIdRepository, DeleteLikeRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(like: Like): Promise<Like> {
    const { id, post, user, createdAt } = await this.prisma.like.create({
      data: {
        postId: like.post.id,
        userId: like.user.id,
      },
      include: {
        post: {
          include: {
            author: true,
          },
        },
        user: true,
      },
    });
    return new Like({ id, post, user, createdAt });
  }

  async findById(params: string): Promise<Like> {
    const { id, post, user, createdAt } = await this.prisma.like.findUnique({
      where: {
        id: params,
      },
      include: {
        post: {
          include: {
            author: true,
          },
        },
        user: true,
      },
    });
    return new Like({ id, post, user, createdAt });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.like.delete({ where: { id } });
  }
}
