import { CreateLikeRepository } from '@server/data/protocols/db';
import { CreateLike } from '@server/domain/use-cases';
import { faker } from '@faker-js/faker';
import { DbCreateLike } from './db-create-like';

const createLikeRepositoryMock = (): CreateLikeRepository => {
  return {
    create: jest.fn(),
  } as CreateLikeRepository;
};

describe('DbCreateLike', () => {
  let createLikeRepository: CreateLikeRepository;
  let dbCreateLike: DbCreateLike;

  beforeEach(() => {
    createLikeRepository = createLikeRepositoryMock();
    dbCreateLike = new DbCreateLike(createLikeRepository);
  });

  it('should create a new like', async () => {
    const createParams: CreateLike.Params = {
      id: faker.string.uuid(),
      post: { id: faker.string.uuid() },
      user: { id: faker.string.uuid() },
    };
    const createdLike: CreateLike.Model = {
      ...createParams,
      createdAt: new Date(),
    };
    jest
      .spyOn(createLikeRepository, 'create')
      .mockImplementationOnce(async () => createdLike);

    const result = await dbCreateLike.create(createParams);

    expect(createLikeRepository.create).toHaveBeenCalledWith(createParams);
    expect(result).toEqual(createdLike);
  });
});
