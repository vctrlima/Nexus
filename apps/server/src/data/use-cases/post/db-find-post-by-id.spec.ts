import { FindPostByIdRepository } from '@server/data/protocols/db';
import { FindPostById } from '@server/domain/use-cases';
import { faker } from '@faker-js/faker';
import { DbFindPostById } from './db-find-post-by-id';

const findPostByIdRepositoryMock = (): FindPostByIdRepository => {
  return {
    findById: jest.fn(),
  } as FindPostByIdRepository;
};

describe('DbFindPostById', () => {
  let findPostByIdRepository: FindPostByIdRepository;
  let dbFindPostById: DbFindPostById;

  beforeEach(() => {
    findPostByIdRepository = findPostByIdRepositoryMock();
    dbFindPostById = new DbFindPostById(findPostByIdRepository);
  });

  it('should find a post by id', async () => {
    const postId = faker.string.uuid();
    const foundPost: FindPostById.Model = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: true,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    jest
      .spyOn(findPostByIdRepository, 'findById')
      .mockImplementationOnce(async () => foundPost);

    const result = await dbFindPostById.findById({ id: postId });

    expect(findPostByIdRepository.findById).toHaveBeenCalledWith({
      id: postId,
    });
    expect(result).toEqual(foundPost);
  });
});
