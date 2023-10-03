import { faker } from '@faker-js/faker';
import { RevokeRefreshTokenByUserId } from '@server/domain/use-cases';
import { serverError, unauthorized } from '@server/presentation/helpers';
import { RevokeRefreshTokenController } from './revoke-refresh-token-controller';

const revokeRefreshTokenByUserIdMock = (): RevokeRefreshTokenByUserId => ({
  revokeByUserId: jest.fn(),
});

describe('RevokeRefreshTokenController', () => {
  let revokeRefreshTokenByUserId: RevokeRefreshTokenByUserId;
  let revokeRefreshTokenController: RevokeRefreshTokenController;

  beforeEach(() => {
    revokeRefreshTokenByUserId = revokeRefreshTokenByUserIdMock();
    revokeRefreshTokenController = new RevokeRefreshTokenController(
      revokeRefreshTokenByUserId
    );
  });

  it('should return 401 if no userId is provided', async () => {
    const request = { user: { id: undefined } };

    const response = await revokeRefreshTokenController.handle(request as any);

    expect(response).toEqual(unauthorized());
  });

  it('should call RevokeRefreshTokenByUserId with correct values', async () => {
    const userId = faker.string.uuid();
    const request = { user: { id: userId } };

    await revokeRefreshTokenController.handle(request as any);

    expect(revokeRefreshTokenByUserId.revokeByUserId).toHaveBeenCalledWith(
      userId
    );
  });

  it('should return 204 on success', async () => {
    const userId = faker.string.uuid();
    const request = { user: { id: userId } };

    const response = await revokeRefreshTokenController.handle(request as any);

    expect(response.statusCode).toBe(204);
    expect(response.body).toBeNull();
  });

  it('should return 500 if RevokeRefreshTokenByUserId throws', async () => {
    const userId = faker.string.uuid();
    const request = { user: { id: userId } };
    jest
      .spyOn(revokeRefreshTokenByUserId, 'revokeByUserId')
      .mockRejectedValueOnce(new Error('Error revoking refresh token'));

    const response = await revokeRefreshTokenController.handle(request as any);

    expect(revokeRefreshTokenByUserId.revokeByUserId).toHaveBeenCalledWith(
      userId
    );
    expect(response).toEqual(
      serverError(new Error('Error revoking refresh token'))
    );
  });
});
