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
      include: { author: true, like: true, list: true },
    })
  }
}
