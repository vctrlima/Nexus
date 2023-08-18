import { PostRepository } from '@/data/protocols/db'
import { Post } from '@/domain/entities'
import { PrismaClient } from '@prisma/client'

export class PrismaPostRepository implements PostRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(post: Post): Promise<{ id: string }> {
    const { id } = await this.prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: post.author.id,
      },
    })
    return { id }
  }

  async findById(id: string): Promise<Post> {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, email: true, name: true } },
      },
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
