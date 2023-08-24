import { RefreshTokenRepository } from '@/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbRevokeRefreshTokenByUserId } from './db-revoke-refresh-token-by-user-id'

const revokeRefreshTokenByUserIdRepositoryMock = (): RefreshTokenRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    revokeByUserId: jest.fn(),
  } as RefreshTokenRepository
}

describe('DbRevokeRefreshTokenByUserId', () => {
  let refreshTokenRepositoryMock: RefreshTokenRepository
  let dbRevokeRefreshTokenByUserId: DbRevokeRefreshTokenByUserId

  beforeEach(() => {
    refreshTokenRepositoryMock = revokeRefreshTokenByUserIdRepositoryMock()
    dbRevokeRefreshTokenByUserId = new DbRevokeRefreshTokenByUserId(
      refreshTokenRepositoryMock,
    )
  })

  it('should revoke a refresh token by user id', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(refreshTokenRepositoryMock, 'revokeByUserId')
      .mockImplementationOnce(() => Promise.resolve())

    await dbRevokeRefreshTokenByUserId.revokeByUserId(userId)

    expect(refreshTokenRepositoryMock.revokeByUserId).toHaveBeenCalledWith(
      userId,
    )
  })
})
