import { faker } from '@faker-js/faker';
import { FindAllTopicsRepository } from '@server/data/protocols/db';
import { FindAllTopics } from '@server/domain/use-cases';
import { DbFindAllTopics } from './db-find-all-topics';

const findAllTopicsRepositoryMock = (): FindAllTopicsRepository => {
  return {
    findAll: jest.fn(),
  } as FindAllTopicsRepository;
};

describe('DbFindAllTopics', () => {
  let findAllTopicsRepository: FindAllTopicsRepository;
  let dbFindAllTopics: DbFindAllTopics;

  beforeEach(() => {
    findAllTopicsRepository = findAllTopicsRepositoryMock();
    dbFindAllTopics = new DbFindAllTopics(findAllTopicsRepository);
  });

  it('should find all topics', async () => {
    const topics: FindAllTopics.Model = [
      {
        id: faker.string.uuid(),
        label: faker.lorem.word(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest
      .spyOn(findAllTopicsRepository, 'findAll')
      .mockImplementationOnce(async () => topics);

    const result = await dbFindAllTopics.findAll();

    expect(findAllTopicsRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(topics);
  });
});
