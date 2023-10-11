import { faker } from '@faker-js/faker';
import { Post } from '@server/domain/entities';
import { DeletePost, FindPostById } from '@server/domain/use-cases';
import {
  noContent,
  serverError,
  unauthorized,
} from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { DeletePostController } from './delete-post-controller';

const deletePostMock = (): DeletePost => ({
  delete: jest.fn(),
});

const findPostByIdMock = (): FindPostById => ({
  findById: jest.fn(),
});

describe('DeletePostController', () => {
  let deletePost: DeletePost;
  let findPostById: FindPostById;
  let deletePostController: DeletePostController;

  beforeEach(() => {
    deletePost = deletePostMock();
    findPostById = findPostByIdMock();
    deletePostController = new DeletePostController(deletePost, findPostById);
  });

  it('should delete a post by id and return 204', async () => {
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
    jest.spyOn(deletePost, 'delete').mockResolvedValue();
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
      user: { id: userId },
    };

    const response = await deletePostController.handle(request);

    expect(deletePost.delete).toHaveBeenCalledWith(postId);
    expect(response).toEqual(noContent());
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
    jest.spyOn(deletePost, 'delete').mockResolvedValue();
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
      user: { id: faker.string.uuid() },
    };

    const response = await deletePostController.handle(request);

    expect(findPostById.findById).toHaveBeenCalledWith({ id: postId });
    expect(response).toEqual(unauthorized());
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
    jest
      .spyOn(deletePost, 'delete')
      .mockRejectedValue(new Error('Error deleting post'));
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
      user: { id: userId },
    };

    const response = await deletePostController.handle(request);

    expect(deletePost.delete).toHaveBeenCalledWith(postId);
    expect(response).toEqual(serverError(new Error('Error deleting post')));
  });
});
