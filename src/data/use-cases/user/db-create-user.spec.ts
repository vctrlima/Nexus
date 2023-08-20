import { Hasher } from '@/data/protocols/cryptography'
import { UserRepository } from '@/data/protocols/db'
import { CreateUser } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbCreateUser } from './db-create-user'

const createUserRepositoryMock = (): UserRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as UserRepository
}

const hasherMock = (): Hasher => {
  return {
    hash: jest.fn(),
  } as Hasher
}

describe('DbCreateUser', () => {
  let userRepositoryMock: UserRepository
  let hasher: Hasher
  let dbCreateUser: DbCreateUser

  beforeEach(() => {
    userRepositoryMock = createUserRepositoryMock()
    hasher = hasherMock()
    dbCreateUser = new DbCreateUser(userRepositoryMock, hasher)
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
