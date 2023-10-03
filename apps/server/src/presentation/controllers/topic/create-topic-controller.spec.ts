import { faker } from '@faker-js/faker';
import { CreateTopic } from '@server/domain/use-cases';
import { badRequest, created, serverError } from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { CreateTopicController } from './create-topic-controller';

const createTopicMock = (): CreateTopic => ({
  create: jest.fn(),
});

describe('CreateTopicController', () => {
  let createTopic: CreateTopic;
  let createTopicController: CreateTopicController;

  beforeEach(() => {
    createTopic = createTopicMock();
    createTopicController = new CreateTopicController(createTopic);
  });

  it('should create a new topic and return 201 Created', async () => {
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
      .spyOn(createTopic, 'create')
      .mockImplementationOnce(async () => createdTopic);
    const request: HttpRequest<CreateTopic.Params> = {
      body: createParams,
    };

    const response = await createTopicController.handle(request);

    expect(createTopic.create).toHaveBeenCalledWith(createParams);
    expect(response).toEqual(created(createdTopic));
  });

  it('should throw MissingParamError if body is not provided', async () => {
    const request: HttpRequest<CreateTopic.Params> = {};

    const response = await createTopicController.handle(request);

    expect(response).toEqual(badRequest(new Error('Missing param: body')));
  });

  it('should return 500 if an error occurs', async () => {
    const createParams: CreateTopic.Params = {
      label: faker.lorem.word(),
    };
    jest
      .spyOn(createTopic, 'create')
      .mockRejectedValueOnce(async () => new Error('Error creating topic'));
    const request: HttpRequest<CreateTopic.Params> = {
      body: createParams,
    };

    const response = await createTopicController.handle(request);

    expect(response).toEqual(serverError(new Error('Error creating topic')));
  });
});
