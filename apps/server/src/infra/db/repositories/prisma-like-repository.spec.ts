import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { Like } from '@server/domain/entities';
import { CreateLike, DeleteLike, FindLikeById } from '@server/domain/use-cases';
import { PrismaLikeRepository } from './prisma-like-repository';

type LikeRepository = CreateLike & FindLikeById & DeleteLike;

const prismaClientMock = (): PrismaClient =>
  ({
    like: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  } as any);

describe('PrismaLikeRepository', () => {
  let prisma: PrismaClient;
  let prismaLikeRepository: LikeRepository;

  beforeEach(() => {
    prisma = prismaClientMock();
    prismaLikeRepository = new PrismaLikeRepository(prisma);
  });

  it('should create a new like', async () => {
    const createParams: CreateLike.Params = {
      post: {
        id: faker.string.uuid(),
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
      },
      user: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    const createdLike: CreateLike.Model = {
      ...createParams,
      id: faker.string.uuid(),
      createdAt: new Date(),
    };
    jest.spyOn(prisma.like, 'create').mockResolvedValue(createdLike as any);

    const result = await prismaLikeRepository.create(createParams);

    expect(prisma.like.create).toHaveBeenCalledWith({
      data: {
        postId: createdLike.post.id,
        userId: createdLike.user.id,
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
    expect(result).toStrictEqual(new Like({ ...(createdLike as any) }));
  });

  it('should find like by id', async () => {
    const likeId = faker.string.uuid();
    const foundLike: FindLikeById.Model = {
      id: likeId,
      post: {
        id: faker.string.uuid(),
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
      },
      user: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
    };
    jest.spyOn(prisma.like, 'findUnique').mockResolvedValue(foundLike as any);

    const result = await prismaLikeRepository.findById(likeId);

    expect(prisma.like.findUnique).toHaveBeenCalledWith({
      where: {
        id: likeId,
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
    expect(result).toStrictEqual(new Like({ ...(foundLike as any) }));
  });

  it('should delete a like by id', async () => {
    const likeId = faker.string.uuid();

    await prismaLikeRepository.delete(likeId);

    expect(prisma.like.delete).toHaveBeenCalledWith({ where: { id: likeId } });
  });
});
