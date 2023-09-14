import {
  CreatePostRepository,
  DeletePostRepository,
  FindPostByIdRepository,
  UpdatePostRepository,
} from '@server/data/protocols/db'
import { Post, User } from '@server/domain/entities'
import { ServerError } from '@server/presentation/errors'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { PrismaPostRepository } from './prisma-post-repository'

type PostRepository = CreatePostRepository &
  FindPostByIdRepository &
  UpdatePostRepository &
  DeletePostRepository

const prismaClientMock = (): PrismaClient =>
  ({
    post: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }) as any

describe('PrismaPostRepository', () => {
  let prisma: PrismaClient
  let prismaPostRepository: PostRepository

  beforeEach(() => {
    prisma = prismaClientMock()
    prismaPostRepository = new PrismaPostRepository(prisma)
  })

  describe('create', () => {
    it('should create a new post', async () => {
      const newPost = {
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

    it('should throw ServerError if author is undefined', async () => {
      const newPost = {
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        published: true,
      }

      const result = prismaPostRepository.create(newPost)

      await expect(result).rejects.toThrowError(
        new ServerError('Author not found'),
      )
    })
  })

  describe('findById', () => {
    it('should find a post by id', async () => {
      const postId = faker.string.uuid()
      const foundPost = {
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
        published: foundPost.published,
        authorId: foundPost.author.id,
        author: {
          id: foundPost.author.id,
          email: foundPost.author.email,
          name: foundPost.author.name,
        },
        createdAt: foundPost.createdAt,
        updatedAt: foundPost.updatedAt,
      } as any)

      const result = await prismaPostRepository.findById(postId)

      expect(prisma.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
        include: {
          author: { select: { id: true, email: true, name: true } },
        },
      })
      expect(result).toStrictEqual(
        new Post({
          id: foundPost.id,
          title: foundPost.title,
          content: foundPost.content,
          published: foundPost.published,
          createdAt: foundPost.createdAt,
          updatedAt: foundPost.updatedAt,
          author: new User({
            id: foundPost.author.id,
            email: foundPost.author.email,
            name: foundPost.author.name,
            password: '',
            posts: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          }),
        }),
      )
    })

    it('should throw ServerError if post is not found', async () => {
      const postId = faker.string.uuid()
      jest.spyOn(prisma.post, 'findUnique').mockResolvedValue(undefined as any)

      const result = prismaPostRepository.findById(postId)

      await expect(result).rejects.toThrowError(
        new ServerError('Post not found'),
      )
    })
  })

  it('should update a post', async () => {
    const updatedPost = {
      id: faker.string.uuid(),
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
    jest.spyOn(prisma.post, 'update').mockResolvedValue({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      published: updatedPost.published,
      authorId: updatedPost.author.id,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    })

    const result = await prismaPostRepository.update(updatedPost)

    expect(prisma.post.update).toHaveBeenCalledWith({
      where: { id: updatedPost.id },
      data: {
        title: updatedPost.title,
        content: updatedPost.content,
        published: updatedPost.published,
      },
    })
    expect(result).toEqual({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      published: updatedPost.published,
      author: updatedPost.author,
    })
  })

  it('should delete an user by id', async () => {
    const postId = faker.string.uuid()

    await prismaPostRepository.delete(postId)

    expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: postId } })
  })
})
