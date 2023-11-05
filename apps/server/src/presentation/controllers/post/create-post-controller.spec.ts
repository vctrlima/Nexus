import { CreatePost, FindPostById } from '@server/domain/use-cases';
import {
  badRequest,
  created,
  serverError,
  unauthorized,
} from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { faker } from '@faker-js/faker';
import { CreatePostController } from './create-post-controller';

const createPostMock = (): CreatePost => ({
  create: jest.fn(),
});

const findPostByIdMock = (): FindPostById => ({
  findById: jest.fn(),
});

describe('CreatePostController', () => {
  let createPost: CreatePost;
  let findPostById: FindPostById;
  let createPostController: CreatePostController;

  beforeEach(() => {
    createPost = createPostMock();
    findPostById = findPostByIdMock();
    createPostController = new CreatePostController(createPost, findPostById);
  });

  it('should create a new post and return 201 Created', async () => {
    const userId = faker.string.uuid();
    const createParams: CreatePost.Params = {
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: { id: userId },
    };
    const createdPost = { id: 'abc123' };
    jest
      .spyOn(createPost, 'create')
      .mockImplementationOnce(async () => createdPost);
    const foundPost: FindPostById.Model = {
      id: faker.string.uuid(),
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: {
        id: userId,
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    jest
      .spyOn(findPostById, 'findById')
      .mockImplementationOnce(async () => foundPost);
    const request: HttpRequest<CreatePost.Params> = {
      body: createParams,
      user: { id: userId },
    };

    const response = await createPostController.handle(request);

    expect(createPost.create).toHaveBeenCalledWith(createParams);
    expect(findPostById.findById).toHaveBeenCalledWith({ id: createdPost.id });
    expect(response).toEqual(created(foundPost));
  });

  it('should throw MissingParamError if body is not provided', async () => {
    const request: HttpRequest<CreatePost.Params> = {};

    const response = await createPostController.handle(request);

    expect(response).toEqual(badRequest(new Error('Missing param: body')));
  });

  it('should throw MissingParamError if body author.id is not provided', async () => {
    const createParams: CreatePost.Params = {
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: { id: undefined },
    };
    const request: HttpRequest<CreatePost.Params> = { body: createParams };

    const response = await createPostController.handle(request);

    expect(response).toEqual(badRequest(new Error('Missing param: authorId')));
  });

  it('should return unauthorized if user id is not provided', async () => {
    const userId = faker.string.uuid();
    const createParams: CreatePost.Params = {
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: { id: userId },
    };
    const request: HttpRequest<CreatePost.Params> = { body: createParams };

    const response = await createPostController.handle(request);

    expect(response).toEqual(unauthorized());
  });

  it('should return 500 if an error occurs', async () => {
    const userId = faker.string.uuid();
    const createParams: CreatePost.Params = {
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: { id: userId },
    };
    jest
      .spyOn(createPost, 'create')
      .mockRejectedValueOnce(async () => new Error('Error creating post'));
    const request: HttpRequest<CreatePost.Params> = {
      body: createParams,
      user: { id: userId },
    };

    const response = await createPostController.handle(request);

    expect(response).toEqual(serverError(new Error('Error creating post')));
  });
});
