import { PostRepository } from '@/data/protocols/db'
import { Post } from '@/domain/entities'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { PrismaPostRepository } from './prisma-post-repository'

const prismaClientMock = (): PrismaClient =>
  ({
    post: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  }) as any

describe('PrismaPostRepository', () => {
  let prisma: PrismaClient
  let prismaPostRepository: PostRepository

  beforeEach(() => {
    prisma = prismaClientMock()
    prismaPostRepository = new PrismaPostRepository(prisma)
  })

  it('should create a new post', async () => {
    const newPost: Post = {
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: true,
      author: { id: faker.string.uuid() },
    }
    const createdPostId = faker.string.uuid()
    jest.spyOn(prisma.post, 'create').mockResolvedValue({
      id: createdPostId,
      title: newPost.title,
      content: newPost.content,
      published: true,
      authorId: newPost.author.id,
      listId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const result = await prismaPostRepository.create(newPost)

    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        title: newPost.title,
        content: newPost.content,
        authorId: newPost.author.id,
      },
    })
    expect(result).toEqual({ id: createdPostId })
  })

  it('should find a post by id', async () => {
    const postId = faker.string.uuid()
    const foundPost: Post = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: true,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest.spyOn(prisma.post, 'findUnique').mockResolvedValue({
      id: foundPost.id,
      title: foundPost.title,
      content: foundPost.content,
      published: true,
      authorId: foundPost.author.id,
      listId: '',
      createdAt: foundPost.createdAt,
      updatedAt: foundPost.updatedAt,
    })

    const result = await prismaPostRepository.findById(postId)

    expect(prisma.post.findUnique).toHaveBeenCalledWith({
      where: { id: postId },
      include: {
        author: { select: { id: true, email: true, name: true } },
      },
    })
    expect(result).toEqual({
      id: foundPost.id,
      title: foundPost.title,
      content: foundPost.content,
      published: true,
      authorId: foundPost.author.id,
      listId: '',
      createdAt: foundPost.createdAt,
      updatedAt: foundPost.updatedAt,
    })
  })
})
