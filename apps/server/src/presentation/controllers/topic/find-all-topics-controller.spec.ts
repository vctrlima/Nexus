import { faker } from '@faker-js/faker';
import { Topic } from '@server/domain/entities';
import { FindAllTopics } from '@server/domain/use-cases';
import { ok, serverError } from '@server/presentation/helpers';
import { FindAllTopicsController } from './find-all-topics-controller';

const findAllTopicsMock = (): FindAllTopics => ({
  findAll: jest.fn(),
});

describe('FindAllTopicsController', () => {
  let findAllTopics: FindAllTopics;
  let findAllTopicsController: FindAllTopicsController;

  beforeEach(() => {
    findAllTopics = findAllTopicsMock();
    findAllTopicsController = new FindAllTopicsController(findAllTopics);
  });

  it('should find all topics and return 200', async () => {
    const topicsFound: Topic[] = [
      {
        id: faker.string.uuid(),
        label: faker.lorem.word(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: faker.string.uuid(),
        label: faker.lorem.word(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(findAllTopics, 'findAll').mockResolvedValue(topicsFound);

    const response = await findAllTopicsController.handle();

    expect(findAllTopics.findAll).toHaveBeenCalled();
    expect(response).toEqual(ok(topicsFound));
  });

  it('should return 500 if an error occurs', async () => {
    jest
      .spyOn(findAllTopics, 'findAll')
      .mockRejectedValueOnce(async () => new Error('Error finding all topics'));

    const response = await findAllTopicsController.handle();

    expect(response).toEqual(
      serverError(new Error('Error finding all topics'))
    );
  });
});
