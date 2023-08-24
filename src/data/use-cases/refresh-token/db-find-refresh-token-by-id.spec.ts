import { RefreshTokenRepository } from '@/data/protocols/db'
import { FindRefreshTokenById } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindRefreshTokenById } from './db-find-refresh-token-by-id'

const findRefreshTokenByIdRepositoryMock = (): RefreshTokenRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    revokeByUserId: jest.fn(),
  } as RefreshTokenRepository
}

describe('DbFindRefreshTokenById', () => {
  let refreshTokenRepositoryMock: RefreshTokenRepository
  let dbFindRefreshTokenById: DbFindRefreshTokenById

  beforeEach(() => {
    refreshTokenRepositoryMock = findRefreshTokenByIdRepositoryMock()
    dbFindRefreshTokenById = new DbFindRefreshTokenById(
      refreshTokenRepositoryMock,
    )
  })

  it('should find a refresh token by id', async () => {
    const id = faker.string.uuid()
    const foundRefreshToken: FindRefreshTokenById.Model = {
      id,
      hashedToken: faker.string.uuid(),
      revoked: false,
    }
    jest
      .spyOn(refreshTokenRepositoryMock, 'findById')
      .mockImplementationOnce(async () => foundRefreshToken)

    const result = await dbFindRefreshTokenById.find(id)

    expect(refreshTokenRepositoryMock.findById).toHaveBeenCalledWith(id)
    expect(result).toEqual(foundRefreshToken)
  })
})
