import { UserRepository } from '@/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbDeleteUser } from './db-delete-user'

const createUserRepositoryMock = (): UserRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as UserRepository
}

describe('DbDeleteUser', () => {
  let userRepositoryMock: UserRepository
  let dbDeleteUser: DbDeleteUser

  beforeEach(() => {
    userRepositoryMock = createUserRepositoryMock()
    dbDeleteUser = new DbDeleteUser(userRepositoryMock)
  })

  it('should delete an user by id', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(userRepositoryMock, 'delete')
      .mockImplementationOnce(() => Promise.resolve())

    await dbDeleteUser.delete(userId)

    expect(userRepositoryMock.delete).toHaveBeenCalledWith(userId)
  })
})
