import { Hasher } from '@server/data/protocols/cryptography'
import { CreateUserRepository } from '@server/data/protocols/db'
import { CreateUser } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbCreateUser } from './db-create-user'

const createUserRepositoryMock = (): CreateUserRepository => {
  return {
    create: jest.fn(),
  } as CreateUserRepository
}

const hasherMock = (): Hasher => {
  return {
    hash: jest.fn(),
  } as Hasher
}

describe('DbCreateUser', () => {
  let createUserRepository: CreateUserRepository
  let hasher: Hasher
  let dbCreateUser: DbCreateUser

  beforeEach(() => {
    createUserRepository = createUserRepositoryMock()
    hasher = hasherMock()
    dbCreateUser = new DbCreateUser(createUserRepository, hasher)
  })

  it('should create a new user', async () => {
    const createParams: CreateUser.Params = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const createdUser: CreateUser.Model = { id: faker.string.uuid() }
    jest
      .spyOn(createUserRepository, 'create')
      .mockImplementationOnce(async () => createdUser)

    const result = await dbCreateUser.create(createParams)

    expect(createUserRepository.create).toHaveBeenCalledWith(createParams)
    expect(result).toEqual(createdUser)
  })
})
