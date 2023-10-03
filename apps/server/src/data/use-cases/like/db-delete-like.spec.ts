import { faker } from '@faker-js/faker';
import { DeleteLikeRepository } from '@server/data/protocols/db';
import { DeleteLike } from '@server/domain/use-cases';
import { DbDeleteLike } from './db-delete-like';

const deleteLikeRepositoryMock = (): DeleteLikeRepository => {
  return {
    delete: jest.fn(),
  } as DeleteLikeRepository;
};

describe('DbDeleteLike', () => {
  let deleteLikeRepository: DeleteLikeRepository;
  let dbDeleteLike: DbDeleteLike;

  beforeEach(() => {
    deleteLikeRepository = deleteLikeRepositoryMock();
    dbDeleteLike = new DbDeleteLike(deleteLikeRepository);
  });

  it('should delete a new like', async () => {
    const deleteParams: DeleteLike.Params = faker.string.uuid();
    jest
      .spyOn(deleteLikeRepository, 'delete')
      .mockImplementationOnce(async () => Promise.resolve());

    await dbDeleteLike.delete(deleteParams);

    expect(deleteLikeRepository.delete).toHaveBeenCalledWith(deleteParams);
  });
});
