import { UserRepository } from '@/data/protocols/db'
import { FindUserById } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindUserById } from './db-find-user-by-id'

const createUserRepositoryMock = (): UserRepository => {
  return {
    findById: jest.fn(),
  } as unknown as UserRepository
}

describe('DbFindUserById', () => {
  let userRepositoryMock: UserRepository
  let dbFindUserById: DbFindUserById

  beforeEach(() => {
    userRepositoryMock = createUserRepositoryMock()
    dbFindUserById = new DbFindUserById(userRepositoryMock)
  })

  it('should find a user by id', async () => {
    const userId = faker.string.uuid()
    const foundUser: FindUserById.Model = {
      id: userId,
      email: faker.internet.email(),
      name: faker.person.fullName(),
    }
    jest
      .spyOn(userRepositoryMock, 'findById')
      .mockImplementationOnce(async () => foundUser)

    const result = await dbFindUserById.find(userId)

    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId)
    expect(result).toEqual(foundUser)
  })
})
