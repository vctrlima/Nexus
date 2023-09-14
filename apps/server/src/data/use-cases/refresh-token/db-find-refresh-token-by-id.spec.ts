import { FindRefreshTokenByIdRepository } from '@server/data/protocols/db'
import { FindRefreshTokenById } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindRefreshTokenById } from './db-find-refresh-token-by-id'

const findRefreshTokenByIdRepositoryMock =
  (): FindRefreshTokenByIdRepository => {
    return {
      findById: jest.fn(),
    } as FindRefreshTokenByIdRepository
  }

describe('DbFindRefreshTokenById', () => {
  let findRefreshTokenByIdRepository: FindRefreshTokenByIdRepository
  let dbFindRefreshTokenById: DbFindRefreshTokenById

  beforeEach(() => {
    findRefreshTokenByIdRepository = findRefreshTokenByIdRepositoryMock()
    dbFindRefreshTokenById = new DbFindRefreshTokenById(
      findRefreshTokenByIdRepository,
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
      .spyOn(findRefreshTokenByIdRepository, 'findById')
      .mockImplementationOnce(async () => foundRefreshToken)

    const result = await dbFindRefreshTokenById.find(id)

    expect(findRefreshTokenByIdRepository.findById).toHaveBeenCalledWith(id)
    expect(result).toEqual(foundRefreshToken)
  })
})
