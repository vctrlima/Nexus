import { UserRepository } from '@/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbDeleteUser } from './db-delete-user'

const createUserRepositoryMock = (): UserRepository => {
  return {
    delete: jest.fn(),
  } as unknown as UserRepository
}

describe('DbDeleteUser', () => {
  let userRepositoryMock: UserRepository
  let dbDeleteUser: DbDeleteUser

  beforeEach(() => {
    userRepositoryMock = createUserRepositoryMock()
    dbDeleteUser = new DbDeleteUser(userRepositoryMock)
  })

  it('should delete a user by id', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(userRepositoryMock, 'delete')
      .mockImplementationOnce(() => Promise.resolve())

    await dbDeleteUser.delete(userId)

    expect(userRepositoryMock.delete).toHaveBeenCalledWith(userId)
  })
})
