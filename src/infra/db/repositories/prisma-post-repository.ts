import {
  CreatePostRepository,
  DeletePostRepository,
  FindPostByIdRepository,
  UpdatePostRepository,
} from '@/data/protocols/db'
import { Post, User } from '@/domain/entities'
import { ServerError } from '@/presentation/errors'
import { PrismaClient } from '@prisma/client'

export class PrismaPostRepository
  implements
    CreatePostRepository,
    FindPostByIdRepository,
    UpdatePostRepository,
    DeletePostRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(post: Post): Promise<{ id: string }> {
    if (!post.author) throw new ServerError('Author not found')
    const { id } = await this.prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.author.id as string,
      },
    })
    return { id }
  }

  async findById(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, email: true, name: true } },
      },
    })
    if (!post) throw new ServerError('Post not found')
    return new Post({
      id: post.id,
      author: new User({
        id: post.author.id,
        email: post.author.email,
        password: '',
        name: post.author.name,
      }),
      content: post.content,
      published: post.published,
      title: post.title,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    })
  }

  async update(post: Post): Promise<Post> {
    const { id, title, content, published } = await this.prisma.post.update({
      where: { id: post.id },
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
      },
    })
    return { id, title, content, published, author: post.author }
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } })
  }
}
