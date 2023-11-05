import { PrismaClient } from '@prisma/client';
import {
  CreatePostRepository,
  DeletePostRepository,
  FindPostByIdRepository,
  FindPostsByParamsRepository,
  UpdatePostRepository,
} from '@server/data/protocols/db';
import { Like, Post, Topic, User } from '@server/domain/entities';
import { FindPostById, FindPostsByParams } from '@server/domain/use-cases';
import { ServerError } from '@server/presentation/errors';

export class PrismaPostRepository
  implements
    CreatePostRepository,
    FindPostByIdRepository,
    FindPostsByParamsRepository,
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

  async findById(params: FindPostById.Params): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: { select: { id: true, email: true, name: true } },
        topics: true,
        likes: params.user?.id
          ? { where: { userId: params.user.id }, include: { user: true } }
          : false,
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
      like:
        post.likes?.length > 0
          ? post.likes.map((like) => new Like({ ...like })).pop()
          : undefined,
      content: post.content,
      published: post.published,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  }

  async findManyByParams(params: FindPostsByParams.Params): Promise<Post[]> {
    let where: any = { published: true };
    if (params.topics) {
      where = { ...where, topics: { some: { id: { in: params.topics } } } };
    }
    if (params.keywords) {
      const search = { search: params.keywords.split(' ').join(' | ') };
      where = {
        ...where,
        OR: [{ title: search }, { content: search }],
      };
    }
    const posts = await this.prisma.post.findMany({
      where,
      include: {
        author: true,
        topics: true,
        likes: params.user?.id
          ? { where: { userId: params.user.id }, include: { user: true } }
          : false,
      },
      skip: params.skip ? parseInt(params.skip.toString()) : 0,
      take: params.take ? parseInt(params.take.toString()) : 10,
      orderBy: { createdAt: 'desc' },
    });
    return posts.map(
      (post) =>
        new Post({
          id: post.id,
          author: new User({
            id: post.author.id,
            email: post.author.email,
            password: '',
            name: post.author.name,
          }),
          topics: post.topics.map((topic) => new Topic({ ...topic })),
          like:
            post.likes?.length > 0
              ? post.likes.map((like) => new Like({ ...like })).pop()
              : undefined,
          content: post.content,
          published: post.published,
          title: post.title,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        })
    );
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
