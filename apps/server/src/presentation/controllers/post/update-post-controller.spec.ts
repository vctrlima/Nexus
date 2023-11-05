import { faker } from '@faker-js/faker';
import { Post } from '@server/domain/entities';
import { FindPostById, UpdatePost } from '@server/domain/use-cases';
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { UpdatePostController } from './update-post-controller';

const updatePostMock = (): UpdatePost => ({
  update: jest.fn(),
});

const findPostByIdMock = (): FindPostById => ({
  findById: jest.fn(),
});

describe('UpdatePostController', () => {
  let updatePost: UpdatePost;
  let findPostById: FindPostById;
  let updatePostController: UpdatePostController;

  beforeEach(() => {
    updatePost = updatePostMock();
    findPostById = findPostByIdMock();
    updatePostController = new UpdatePostController(updatePost, findPostById);
  });

  it('should update a post and return 200 OK', async () => {
    const postId = faker.string.uuid();
    const userId = faker.string.uuid();
    const foundPost: Post = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: {
        id: userId,
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    jest.spyOn(findPostById, 'findById').mockResolvedValue(foundPost);
    const updateData: UpdatePost.Params = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: true,
      author: {
        id: userId,
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    const updatedPost = updateData;
    jest.spyOn(updatePost, 'update').mockResolvedValue(updateData);
    const request: HttpRequest<UpdatePost.Params> = {
      params: { id: postId },
      user: { id: userId },
      body: updateData,
    };

    const response = await updatePostController.handle(request);

    expect(updatePost.update).toHaveBeenCalledWith(updateData);
    expect(response).toEqual(ok(updatedPost));
  });

  it('should return unauthorized if user id is different than post user id', async () => {
    const postId = faker.string.uuid();
    const foundPost: Post = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    jest.spyOn(findPostById, 'findById').mockResolvedValue(foundPost);
    const updateData: UpdatePost.Params = {
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
    jest.spyOn(updatePost, 'update').mockResolvedValue(updateData);
    const request: HttpRequest<UpdatePost.Params> = {
      params: { id: postId },
      user: { id: faker.string.uuid() },
      body: updateData,
    };

    const response = await updatePostController.handle(request);

    expect(findPostById.findById).toHaveBeenCalledWith({ id: postId });
    expect(response).toEqual(unauthorized());
  });

  it('should throw MissingParamError if body is not provided', async () => {
    const request: HttpRequest<UpdatePost.Params> = {
      params: { id: faker.string.uuid() },
    };

    const response = await updatePostController.handle(request);

    expect(response).toEqual(badRequest(new Error('Missing param: body')));
  });

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const postId = faker.string.uuid();
    const userId = faker.string.uuid();
    const foundPost: Post = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: {
        id: userId,
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    jest.spyOn(findPostById, 'findById').mockResolvedValue(foundPost);
    const updateData: UpdatePost.Params = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: true,
      author: {
        id: userId,
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    jest
      .spyOn(updatePost, 'update')
      .mockRejectedValue(new Error('Error updating post'));
    const request: HttpRequest<UpdatePost.Params> = {
      params: { id: postId },
      user: { id: userId },
      body: updateData,
    };

    const response = await updatePostController.handle(request);

    expect(updatePost.update).toHaveBeenCalledWith(updateData);
    expect(response).toEqual(serverError(new Error('Error updating post')));
  });
});
