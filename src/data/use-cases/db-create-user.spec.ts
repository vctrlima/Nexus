import { UserRepository } from '@/data/protocols/db'
import { DbCreateUser } from './db-create-user'
import { CreateUser } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'

const createUserRepositoryMock = (): UserRepository => {
  return { create: jest.fn(), findById: jest.fn() } as UserRepository
}

describe('DbCreateUser', () => {
  let userRepositoryMock: UserRepository
  let dbCreateUser: DbCreateUser

  beforeEach(() => {
    userRepositoryMock = createUserRepositoryMock()
    dbCreateUser = new DbCreateUser(userRepositoryMock)
  })

  it('should create a new user', async () => {
    const createParams: CreateUser.Params = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const createdUser: CreateUser.Model = { id: faker.string.uuid() }
    jest
      .spyOn(userRepositoryMock, 'create')
      .mockImplementationOnce(async () => createdUser)

    const result = await dbCreateUser.create(createParams)

    expect(userRepositoryMock.create).toHaveBeenCalledWith(createParams)
    expect(result).toEqual(createdUser)
  })
})
