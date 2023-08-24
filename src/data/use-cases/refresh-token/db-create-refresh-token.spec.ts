import { RefreshTokenRepository } from '@/data/protocols/db'
import { CreateRefreshToken } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbCreateRefreshToken } from './db-create-refresh-token'

const createRefreshTokenRepositoryMock = (): RefreshTokenRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    revokeByUserId: jest.fn(),
  } as RefreshTokenRepository
}

describe('DbCreateRefreshToken', () => {
  let refreshTokenRepositoryMock: RefreshTokenRepository
  let dbCreateRefreshToken: DbCreateRefreshToken

  beforeEach(() => {
    refreshTokenRepositoryMock = createRefreshTokenRepositoryMock()
    dbCreateRefreshToken = new DbCreateRefreshToken(refreshTokenRepositoryMock)
  })

  it('should create a refresh token', async () => {
    const createParams: CreateRefreshToken.Params = {
      jti: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
      userId: faker.string.uuid(),
    }
    const createdRefreshToken: CreateRefreshToken.Model = {
      id: createParams.jti,
      hashedToken: createParams.refreshToken,
      revoked: false,
    }
    jest
      .spyOn(refreshTokenRepositoryMock, 'create')
      .mockImplementationOnce(async () => createdRefreshToken)

    const result = await dbCreateRefreshToken.create(createParams)

    expect(refreshTokenRepositoryMock.create).toHaveBeenCalledWith(createParams)
    expect(result).toEqual(createdRefreshToken)
  })
})
