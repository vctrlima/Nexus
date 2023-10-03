import { faker } from '@faker-js/faker';
import { CreateTopicRepository } from '@server/data/protocols/db';
import { CreateTopic } from '@server/domain/use-cases';
import { DbCreateTopic } from './db-create-topic';

const createTopicRepositoryMock = (): CreateTopicRepository => {
  return {
    create: jest.fn(),
  } as CreateTopicRepository;
};

describe('DbCreateTopic', () => {
  let createTopicRepository: CreateTopicRepository;
  let dbCreateTopic: DbCreateTopic;

  beforeEach(() => {
    createTopicRepository = createTopicRepositoryMock();
    dbCreateTopic = new DbCreateTopic(createTopicRepository);
  });

  it('should create a new topic', async () => {
    const createParams: CreateTopic.Params = {
      label: faker.lorem.word(),
    };
    const createdTopic: CreateTopic.Model = {
      id: faker.string.uuid(),
      label: createParams.label,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest
      .spyOn(createTopicRepository, 'create')
      .mockImplementationOnce(async () => createdTopic);

    const result = await dbCreateTopic.create(createParams);

    expect(createTopicRepository.create).toHaveBeenCalledWith(createParams);
    expect(result).toEqual(createdTopic);
  });
});
