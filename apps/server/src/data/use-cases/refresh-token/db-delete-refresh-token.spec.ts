import { DeleteRefreshTokenRepository } from '@server/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbDeleteRefreshToken } from './db-delete-refresh-token'

const deleteRefreshTokenRepositoryMock = (): DeleteRefreshTokenRepository => {
  return {
    delete: jest.fn(),
  } as DeleteRefreshTokenRepository
}

describe('DbDeleteRefreshToken', () => {
  let deleteRefreshTokenRepository: DeleteRefreshTokenRepository
  let dbDeleteRefreshToken: DbDeleteRefreshToken

  beforeEach(() => {
    deleteRefreshTokenRepository = deleteRefreshTokenRepositoryMock()
    dbDeleteRefreshToken = new DbDeleteRefreshToken(
      deleteRefreshTokenRepository,
    )
  })

  it('should delete a refresh token by id', async () => {
    const refreshTokenId = faker.string.uuid()
    jest
      .spyOn(deleteRefreshTokenRepository, 'delete')
      .mockImplementationOnce(() => Promise.resolve())

    await dbDeleteRefreshToken.delete(refreshTokenId)

    expect(deleteRefreshTokenRepository.delete).toHaveBeenCalledWith(
      refreshTokenId,
    )
  })
})
