import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import {
  CreatePostRepository,
  DeletePostRepository,
  FindPostByIdRepository,
  FindPostsByParamsRepository,
  UpdatePostRepository,
} from '@server/data/protocols/db';
import { Like, Post, Topic, User } from '@server/domain/entities';
import { FindPostsByParams } from '@server/domain/use-cases';
import { ServerError } from '@server/presentation/errors';
import { PrismaPostRepository } from './prisma-post-repository';

type PostRepository = CreatePostRepository &
  FindPostByIdRepository &
  FindPostsByParamsRepository &
  UpdatePostRepository &
  DeletePostRepository;

const prismaClientMock = (): PrismaClient =>
  ({
    post: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  } as any);

describe('PrismaPostRepository', () => {
  let prisma: PrismaClient;
  let prismaPostRepository: PostRepository;

  beforeEach(() => {
    prisma = prismaClientMock();
    prismaPostRepository = new PrismaPostRepository(prisma);
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        published: true,
        author: { id: faker.string.uuid() },
        topics: [
          {
            id: faker.string.uuid(),
            label: faker.lorem.word(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      };
      const createdPostId = faker.string.uuid();
      jest.spyOn(prisma.post, 'create').mockResolvedValue({
        id: createdPostId,
        title: newPost.title,
        content: newPost.content,
        published: true,
        authorId: newPost.author.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await prismaPostRepository.create(newPost);

      expect(prisma.post.create).toHaveBeenCalledWith({
        data: {
          title: newPost.title,
          content: newPost.content,
          authorId: newPost.author.id,
          topics: {
            connect: newPost.topics.map((topic) => ({ id: topic.id })),
          },
        },
      });
      expect(result).toEqual({ id: createdPostId });
    });

    it('should throw ServerError if author is undefined', async () => {
      const newPost = {
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        published: true,
      };

      const result = prismaPostRepository.create(newPost);

      await expect(result).rejects.toThrowError(
        new ServerError('Author not found')
      );
    });
  });

  describe('findById', () => {
    it('should find a post by id', async () => {
      const userId = faker.string.uuid();
      const postId = faker.string.uuid();
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
        topics: [
          {
            id: faker.string.uuid(),
            label: faker.lorem.word(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        likes: [
          {
            id: faker.string.uuid(),
            user: {
              id: faker.string.uuid(),
              email: faker.internet.email(),
              name: faker.person.fullName(),
              password: undefined,
            },
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
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
        likes: foundPost.likes,
        topics: foundPost.topics,
        createdAt: foundPost.createdAt,
        updatedAt: foundPost.updatedAt,
      } as any);

      const result = await prismaPostRepository.findById({
        id: postId,
        user: { id: userId },
      });

      expect(prisma.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
        include: {
          author: { select: { id: true, email: true, name: true } },
          likes: { where: { userId }, include: { user: true } },
          topics: true,
        },
      });
      expect(result).toStrictEqual(
        new Post({
          id: foundPost.id,
          title: foundPost.title,
          content: foundPost.content,
          published: foundPost.published,
          author: new User({
            id: foundPost.author.id,
            email: foundPost.author.email,
            name: foundPost.author.name,
            password: '',
            posts: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          }),
          topics: foundPost.topics.map((topic) => new Topic({ ...topic })),
          like: foundPost.likes.map((like) => new Like({ ...like })).pop(),
          createdAt: foundPost.createdAt,
          updatedAt: foundPost.updatedAt,
        })
      );
    });

    it('should find a post by id without likes', async () => {
      const postId = faker.string.uuid();
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
        topics: [
          {
            id: faker.string.uuid(),
            label: faker.lorem.word(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
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
        topics: foundPost.topics,
        createdAt: foundPost.createdAt,
        updatedAt: foundPost.updatedAt,
      } as any);

      const result = await prismaPostRepository.findById({
        id: postId,
      });

      expect(prisma.post.findUnique).toHaveBeenCalledWith({
        where: { id: postId },
        include: {
          author: { select: { id: true, email: true, name: true } },
          likes: false,
          topics: true,
        },
      });
      expect(result).toStrictEqual(
        new Post({
          id: foundPost.id,
          title: foundPost.title,
          content: foundPost.content,
          published: foundPost.published,
          author: new User({
            id: foundPost.author.id,
            email: foundPost.author.email,
            name: foundPost.author.name,
            password: '',
            posts: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          }),
          topics: foundPost.topics.map((topic) => new Topic({ ...topic })),
          like: undefined,
          createdAt: foundPost.createdAt,
          updatedAt: foundPost.updatedAt,
        })
      );
    });

    it('should throw ServerError if post is not found', async () => {
      const postId = faker.string.uuid();
      jest.spyOn(prisma.post, 'findUnique').mockResolvedValue(undefined as any);

      const result = prismaPostRepository.findById({ id: postId });

      await expect(result).rejects.toThrowError(
        new ServerError('Post not found')
      );
    });
  });

  describe('findManyByParams', () => {
    it('should find many posts by params', async () => {
      const userId = faker.string.uuid();
      const params: FindPostsByParams.Params = {
        keywords: faker.lorem.words(),
        topics: [faker.string.uuid()],
        skip: 10,
        take: 10,
        user: { id: userId },
      };
      const like = {
        id: faker.string.uuid(),
        user: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: undefined,
        },
      };
      const post = {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        published: true,
        author: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
        },
        topics: [
          {
            id: faker.string.uuid(),
            label: faker.lorem.word(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        likes: [like],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.post, 'findMany').mockResolvedValue([
        {
          id: post.id,
          title: post.title,
          content: post.content,
          published: post.published,
          authorId: post.author.id,
          author: {
            id: post.author.id,
            email: post.author.email,
            name: post.author.name,
          },
          topics: post.topics,
          likes: [like],
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      ] as any[]);

      const result = await prismaPostRepository.findManyByParams(params);

      expect(prisma.post.findMany).toHaveBeenCalledWith({
        where: {
          published: true,
          topics: { some: { id: { in: params.topics } } },
          OR: [
            { title: { search: params.keywords.split(' ').join(' | ') } },
            { content: { search: params.keywords.split(' ').join(' | ') } },
          ],
        },
        include: {
          author: true,
          topics: true,
          likes: { where: { userId }, include: { user: true } },
        },
        skip: parseInt(params.skip.toString()),
        take: parseInt(params.take.toString()),
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toStrictEqual(
        result.map(
          (post) =>
            new Post({
              id: post.id,
              author: new User({
                id: post.author.id,
                email: post.author.email,
                password: '',
                name: post.author.name,
              }),
              topics: post.topics.map(
                (topic) => new Topic({ ...(topic as any) })
              ),
              like: new Like({ ...(like as any) }),
              content: post.content,
              published: post.published,
              title: post.title,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
            })
        )
      );
    });

    it('should call findMany with default skip and take params', async () => {
      const params: FindPostsByParams.Params = {
        keywords: faker.lorem.words(),
        topics: [faker.string.uuid()],
      };
      const post = {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        published: true,
        author: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
        },
        topics: [
          {
            id: faker.string.uuid(),
            label: faker.lorem.word(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.post, 'findMany').mockResolvedValue([
        {
          id: post.id,
          title: post.title,
          content: post.content,
          published: post.published,
          authorId: post.author.id,
          author: {
            id: post.author.id,
            email: post.author.email,
            name: post.author.name,
          },
          topics: post.topics,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
        },
      ] as any[]);

      const result = await prismaPostRepository.findManyByParams(params);

      expect(prisma.post.findMany).toHaveBeenCalledWith({
        where: {
          published: true,
          topics: { some: { id: { in: params.topics } } },
          OR: [
            { title: { search: params.keywords.split(' ').join(' | ') } },
            { content: { search: params.keywords.split(' ').join(' | ') } },
          ],
        },
        include: { author: true, topics: true, likes: false },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
      expect(result).toStrictEqual(
        result.map(
          (post) =>
            new Post({
              id: post.id,
              author: new User({
                id: post.author.id,
                email: post.author.email,
                password: '',
                name: post.author.name,
              }),
              topics: post.topics.map(
                (topic) => new Topic({ ...(topic as any) })
              ),
              content: post.content,
              published: post.published,
              title: post.title,
              createdAt: post.createdAt,
              updatedAt: post.updatedAt,
            })
        )
      );
    });
  });

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
      topics: [
        {
          id: faker.string.uuid(),
          label: faker.lorem.word(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(prisma.post, 'update').mockResolvedValue({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      published: updatedPost.published,
      authorId: updatedPost.author.id,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    });

    const result = await prismaPostRepository.update(updatedPost);

    expect(prisma.post.update).toHaveBeenCalledWith({
      where: { id: updatedPost.id },
      data: {
        title: updatedPost.title,
        content: updatedPost.content,
        published: updatedPost.published,
        topics: {
          connect: updatedPost.topics.map((topic) => ({ id: topic.id })),
        },
      },
    });
    expect(result).toEqual({
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      published: updatedPost.published,
      author: updatedPost.author,
      topics: updatedPost.topics,
    });
  });

  it('should delete a post by id', async () => {
    const postId = faker.string.uuid();

    await prismaPostRepository.delete(postId);

    expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: postId } });
  });
});
