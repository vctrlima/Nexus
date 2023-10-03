import {
  CreatePostRepository,
  DeletePostRepository,
  FindPostByIdRepository,
  UpdatePostRepository,
} from '@server/data/protocols/db';
import { Post, Topic, User } from '@server/domain/entities';
import { ServerError } from '@server/presentation/errors';
import { PrismaClient } from '@prisma/client';

export class PrismaPostRepository
  implements
    CreatePostRepository,
    FindPostByIdRepository,
    UpdatePostRepository,
    DeletePostRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(post: Post): Promise<{ id: string }> {
    if (!post.author) throw new ServerError('Author not found');
    const { id } = await this.prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.author.id as string,
        topics: { connect: post.topics.map((topic) => ({ id: topic.id })) },
      },
    });
    return { id };
  }

  async findById(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, email: true, name: true } },
        likes: { select: { id: true } },
        topics: true,
      },
    });
    if (!post) throw new ServerError('Post not found');
    return new Post({
      id: post.id,
      author: new User({
        id: post.author.id,
        email: post.author.email,
        password: '',
        name: post.author.name,
      }),
      topics: post.topics.map((topic) => new Topic({ ...topic })),
      content: post.content,
      published: post.published,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  }

  async update(post: Post): Promise<Post> {
    const { id, title, content, published } = await this.prisma.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        topics: { connect: post.topics.map((topic) => ({ id: topic.id })) },
      },
    });
    return {
      id,
      title,
      content,
      published,
      author: post.author,
      topics: post.topics,
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
