import { faker } from '@faker-js/faker';
import { FindLikeByIdRepository } from '@server/data/protocols/db';
import { FindLikeById } from '@server/domain/use-cases';
import { DbFindLikeById } from './db-find-like-by-id';

const findLikeByIdRepositoryMock = (): FindLikeByIdRepository => {
  return {
    findById: jest.fn(),
  } as FindLikeByIdRepository;
};

describe('DbFindLikeById', () => {
  let findLikeByIdRepository: FindLikeByIdRepository;
  let dbFindLikeById: DbFindLikeById;

  beforeEach(() => {
    findLikeByIdRepository = findLikeByIdRepositoryMock();
    dbFindLikeById = new DbFindLikeById(findLikeByIdRepository);
  });

  it('should find a like by id', async () => {
    const likeId = faker.string.uuid();
    const foundLike: FindLikeById.Model = {
      id: likeId,
      user: { id: faker.string.uuid() },
      post: { id: faker.string.uuid() },
      createdAt: new Date(),
    };
    jest
      .spyOn(findLikeByIdRepository, 'findById')
      .mockImplementationOnce(async () => foundLike);

    const result = await dbFindLikeById.findById(likeId);

    expect(findLikeByIdRepository.findById).toHaveBeenCalledWith(likeId);
    expect(result).toEqual(foundLike);
  });
});
