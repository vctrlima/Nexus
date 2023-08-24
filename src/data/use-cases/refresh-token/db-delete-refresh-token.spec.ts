import { RefreshTokenRepository } from '@/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbDeleteRefreshToken } from './db-delete-refresh-token'

const deleteRefreshTokenRepositoryMock = (): RefreshTokenRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    revokeByUserId: jest.fn(),
  } as RefreshTokenRepository
}

describe('DbDeleteRefreshToken', () => {
  let refreshTokenRepositoryMock: RefreshTokenRepository
  let dbDeleteRefreshToken: DbDeleteRefreshToken

  beforeEach(() => {
    refreshTokenRepositoryMock = deleteRefreshTokenRepositoryMock()
    dbDeleteRefreshToken = new DbDeleteRefreshToken(refreshTokenRepositoryMock)
  })

  it('should delete a refresh token by id', async () => {
    const refreshTokenId = faker.string.uuid()
    jest
      .spyOn(refreshTokenRepositoryMock, 'delete')
      .mockImplementationOnce(() => Promise.resolve())

    await dbDeleteRefreshToken.delete(refreshTokenId)

    expect(refreshTokenRepositoryMock.delete).toHaveBeenCalledWith(
      refreshTokenId,
    )
  })
})
