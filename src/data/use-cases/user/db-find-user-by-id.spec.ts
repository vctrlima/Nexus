import { UserRepository } from '@/data/protocols/db'
import { FindUserById } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindUserById } from './db-find-user-by-id'

const createUserRepositoryMock = (): UserRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as UserRepository
}

describe('DbFindUserById', () => {
  let userRepositoryMock: UserRepository
  let dbFindUserById: DbFindUserById

  beforeEach(() => {
    userRepositoryMock = createUserRepositoryMock()
    dbFindUserById = new DbFindUserById(userRepositoryMock)
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
      .spyOn(userRepositoryMock, 'findById')
      .mockImplementationOnce(async () => foundUser)

    const result = await dbFindUserById.find(userId)

    expect(userRepositoryMock.findById).toHaveBeenCalledWith(userId)
    expect(result).toEqual(foundUser)
  })

  it('should throw Error if user is not found', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(userRepositoryMock, 'findById')
      .mockImplementationOnce(async () => undefined as any)

    const result = dbFindUserById.find(userId)

    await expect(result).rejects.toThrowError('User not found')
  })
})
