import { Hasher } from '@/data/protocols/cryptography'
import { UserRepository } from '@/data/protocols/db'
import { UpdateUser } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbUpdateUser } from './db-update-user'

const updateUserRepositoryMock = (): UserRepository => {
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

describe('DbUpdateUser', () => {
  let userRepositoryMock: UserRepository
  let hasher: Hasher
  let dbUpdateUser: DbUpdateUser

  beforeEach(() => {
    userRepositoryMock = updateUserRepositoryMock()
    hasher = hasherMock()
    dbUpdateUser = new DbUpdateUser(userRepositoryMock, hasher)
  })

  it('should update an existent user', async () => {
    const updateParams: UpdateUser.Params = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const updatedUser: UpdateUser.Model = { ...updateParams }
    jest
      .spyOn(userRepositoryMock, 'update')
      .mockImplementationOnce(async () => updatedUser)

    const result = await dbUpdateUser.update(updateParams)

    expect(userRepositoryMock.update).toHaveBeenCalledWith(updateParams)
    expect(result).toEqual(updatedUser)
  })
})
