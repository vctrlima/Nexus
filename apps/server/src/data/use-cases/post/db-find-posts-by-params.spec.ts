import { faker } from '@faker-js/faker';
import { FindPostsByParamsRepository } from '@server/data/protocols/db';
import { FindPostsByParams } from '@server/domain/use-cases';
import { DbFindPostsByParams } from './db-find-posts-by-params';

const findPostsByParamsRepositoryMock = (): FindPostsByParamsRepository => {
  return {
    findManyByParams: jest.fn(),
  } as FindPostsByParamsRepository;
};

describe('DbFindPostsByParams', () => {
  let findPostsByParamsRepository: FindPostsByParamsRepository;
  let dbFindPostsByParams: DbFindPostsByParams;

  beforeEach(() => {
    findPostsByParamsRepository = findPostsByParamsRepositoryMock();
    dbFindPostsByParams = new DbFindPostsByParams(findPostsByParamsRepository);
  });

  it('should posts by params', async () => {
    const params: FindPostsByParams.Params = {
      keywords: faker.lorem.words(),
      topics: [faker.lorem.word(), faker.lorem.word()],
      skip: 0,
      take: 20,
    };
    const foundPost: FindPostsByParams.Model = [
      {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        published: true,
        author: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
        },
      },
    ];
    jest
      .spyOn(findPostsByParamsRepository, 'findManyByParams')
      .mockImplementationOnce(async () => foundPost);

    const result = await dbFindPostsByParams.findManyByParams(params);

    expect(findPostsByParamsRepository.findManyByParams).toHaveBeenCalledWith(
      params
    );
    expect(result).toEqual(foundPost);
  });
});
