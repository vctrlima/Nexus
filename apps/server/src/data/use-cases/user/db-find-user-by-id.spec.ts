import { FindUserByIdRepository } from '@server/data/protocols/db'
import { FindUserById } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindUserById } from './db-find-user-by-id'

const findUserByIdRepositoryMock = (): FindUserByIdRepository => {
  return {
    findById: jest.fn(),
  } as FindUserByIdRepository
}

describe('DbFindUserById', () => {
  let findUserByIdRepository: FindUserByIdRepository
  let dbFindUserById: DbFindUserById

  beforeEach(() => {
    findUserByIdRepository = findUserByIdRepositoryMock()
    dbFindUserById = new DbFindUserById(findUserByIdRepository)
  })

  it('should find an user by id', async () => {
    const userId = faker.string.uuid()
    const foundUser: FindUserById.Model = {
      id: userId,
      password: faker.internet.password(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
    }
    jest
      .spyOn(findUserByIdRepository, 'findById')
      .mockImplementationOnce(async () => foundUser)

    const result = await dbFindUserById.find(userId)

    expect(findUserByIdRepository.findById).toHaveBeenCalledWith(userId)
    expect(result).toEqual(foundUser)
  })

  it('should throw Error if user is not found', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(findUserByIdRepository, 'findById')
      .mockImplementationOnce(async () => undefined as any)

    const result = dbFindUserById.find(userId)

    await expect(result).rejects.toThrowError('User not found')
  })
})
