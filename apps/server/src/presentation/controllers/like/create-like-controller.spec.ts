import { faker } from '@faker-js/faker';
import { CreateLike } from '@server/domain/use-cases';
import { badRequest, created, serverError } from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { CreateLikeController } from './create-like-controller';

const createLikeMock = (): CreateLike => ({
  create: jest.fn(),
});

describe('CreateLikeController', () => {
  let createLike: CreateLike;
  let createLikeController: CreateLikeController;

  beforeEach(() => {
    createLike = createLikeMock();
    createLikeController = new CreateLikeController(createLike);
  });

  it('should create a new like and return 201 Created', async () => {
    const userId = faker.string.uuid();
    const createParams: CreateLike.Params = {
      user: { id: userId },
      post: { id: faker.string.uuid() },
    };
    const createdLike: CreateLike.Model = {
      ...createParams,
      id: faker.string.uuid(),
      createdAt: new Date(),
    };
    jest
      .spyOn(createLike, 'create')
      .mockImplementationOnce(async () => createdLike);
    const request: HttpRequest<CreateLike.Params> = {
      body: createParams,
      user: { id: userId },
    };

    const response = await createLikeController.handle(request);

    expect(createLike.create).toHaveBeenCalledWith(createParams);
    expect(response).toEqual(created(createdLike));
  });

  it('should throw MissingParamError if body is not provided', async () => {
    const request: HttpRequest<CreateLike.Params> = {};

    const response = await createLikeController.handle(request);

    expect(response).toEqual(badRequest(new Error('Missing param: body')));
  });

  it('should return 500 if an error occurs', async () => {
    const userId = faker.string.uuid();
    const createParams: CreateLike.Params = {
      user: { id: userId },
      post: { id: faker.string.uuid() },
    };
    jest
      .spyOn(createLike, 'create')
      .mockRejectedValueOnce(async () => new Error('Error creating like'));
    const request: HttpRequest<CreateLike.Params> = {
      body: createParams,
      user: { id: userId },
    };

    const response = await createLikeController.handle(request);

    expect(response).toEqual(serverError(new Error('Error creating like')));
  });
});
