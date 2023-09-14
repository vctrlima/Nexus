import { RevokeRefreshTokenByUserIdRepository } from '@server/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbRevokeRefreshTokenByUserId } from './db-revoke-refresh-token-by-user-id'

const revokeRefreshTokenByUserIdRepositoryMock =
  (): RevokeRefreshTokenByUserIdRepository => {
    return {
      revokeByUserId: jest.fn(),
    } as RevokeRefreshTokenByUserIdRepository
  }

describe('DbRevokeRefreshTokenByUserId', () => {
  let revokeRefreshTokenByUserIdRepository: RevokeRefreshTokenByUserIdRepository
  let dbRevokeRefreshTokenByUserId: DbRevokeRefreshTokenByUserId

  beforeEach(() => {
    revokeRefreshTokenByUserIdRepository =
      revokeRefreshTokenByUserIdRepositoryMock()
    dbRevokeRefreshTokenByUserId = new DbRevokeRefreshTokenByUserId(
      revokeRefreshTokenByUserIdRepository,
    )
  })

  it('should revoke a refresh token by user id', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(revokeRefreshTokenByUserIdRepository, 'revokeByUserId')
      .mockImplementationOnce(() => Promise.resolve())

    await dbRevokeRefreshTokenByUserId.revokeByUserId(userId)

    expect(
      revokeRefreshTokenByUserIdRepository.revokeByUserId,
    ).toHaveBeenCalledWith(userId)
  })
})
