import { faker } from '@faker-js/faker';
import { Like } from '@server/domain/entities';
import { DeleteLike, FindLikeById } from '@server/domain/use-cases';
import {
  noContent,
  serverError,
  unauthorized,
} from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { DeleteLikeController } from './delete-like-controller';

const deleteLikeMock = (): DeleteLike => ({
  delete: jest.fn(),
});

const findLikeByIdMock = (): FindLikeById => ({
  findById: jest.fn(),
});

describe('DeleteLikeController', () => {
  let deleteLike: DeleteLike;
  let findLikeById: FindLikeById;
  let deleteLikeController: DeleteLikeController;

  beforeEach(() => {
    deleteLike = deleteLikeMock();
    findLikeById = findLikeByIdMock();
    deleteLikeController = new DeleteLikeController(deleteLike, findLikeById);
  });

  it('should delete a like by id and return 204', async () => {
    const userId = faker.string.uuid();
    const likeId = faker.string.uuid();
    const foundLike: Like = {
      id: likeId,
      user: { id: userId },
      post: { id: faker.string.uuid() },
      createdAt: new Date(),
    };
    jest
      .spyOn(findLikeById, 'findById')
      .mockImplementationOnce(async () => foundLike);
    jest.spyOn(deleteLike, 'delete').mockResolvedValue();
    const request: HttpRequest<{ id: string }> = {
      params: { id: likeId },
      user: { id: userId },
    };

    const response = await deleteLikeController.handle(request);

    expect(deleteLike.delete).toHaveBeenCalledWith(likeId);
    expect(response).toEqual(noContent());
  });

  it('should return unauthorized if user id is different than like user id', async () => {
    const likeId = faker.string.uuid();
    const foundLike: Like = {
      id: likeId,
      user: { id: faker.string.uuid() },
      post: { id: faker.string.uuid() },
      createdAt: new Date(),
    };
    jest
      .spyOn(findLikeById, 'findById')
      .mockImplementationOnce(async () => foundLike);
    jest.spyOn(deleteLike, 'delete').mockResolvedValue();
    const request: HttpRequest<{ id: string }> = {
      params: { id: likeId },
      user: { id: faker.string.uuid() },
    };

    const response = await deleteLikeController.handle(request);

    expect(findLikeById.findById).toHaveBeenCalledWith(likeId);
    expect(response).toEqual(unauthorized());
  });

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const userId = faker.string.uuid();
    const likeId = faker.string.uuid();
    const foundLike: Like = {
      id: likeId,
      user: { id: userId },
      post: { id: faker.string.uuid() },
      createdAt: new Date(),
    };
    jest
      .spyOn(findLikeById, 'findById')
      .mockImplementationOnce(async () => foundLike);
    jest
      .spyOn(deleteLike, 'delete')
      .mockRejectedValue(new Error('Error deleting like'));
    const request: HttpRequest<{ id: string }> = {
      params: { id: likeId },
      user: { id: userId },
    };

    const response = await deleteLikeController.handle(request);

    expect(deleteLike.delete).toHaveBeenCalledWith(likeId);
    expect(response).toEqual(serverError(new Error('Error deleting like')));
  });
});
