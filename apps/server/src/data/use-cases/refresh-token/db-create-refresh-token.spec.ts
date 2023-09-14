import { CreateRefreshTokenRepository } from '@server/data/protocols/db'
import { CreateRefreshToken } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbCreateRefreshToken } from './db-create-refresh-token'

const createRefreshTokenRepositoryMock = (): CreateRefreshTokenRepository => {
  return {
    create: jest.fn(),
  } as CreateRefreshTokenRepository
}

describe('DbCreateRefreshToken', () => {
  let createRefreshTokenRepository: CreateRefreshTokenRepository
  let dbCreateRefreshToken: DbCreateRefreshToken

  beforeEach(() => {
    createRefreshTokenRepository = createRefreshTokenRepositoryMock()
    dbCreateRefreshToken = new DbCreateRefreshToken(
      createRefreshTokenRepository,
    )
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
      .spyOn(createRefreshTokenRepository, 'create')
      .mockImplementationOnce(async () => createdRefreshToken)

    const result = await dbCreateRefreshToken.create(createParams)

    expect(createRefreshTokenRepository.create).toHaveBeenCalledWith(
      createParams,
    )
    expect(result).toEqual(createdRefreshToken)
  })
})
