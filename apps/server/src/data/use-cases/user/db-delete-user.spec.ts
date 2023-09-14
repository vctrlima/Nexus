import { DeleteUserRepository } from '@server/data/protocols/db'
import { faker } from '@faker-js/faker'
import { DbDeleteUser } from './db-delete-user'

const deleteUserRepositoryMock = (): DeleteUserRepository => {
  return {
    delete: jest.fn(),
  } as DeleteUserRepository
}

describe('DbDeleteUser', () => {
  let deleteUserRepository: DeleteUserRepository
  let dbDeleteUser: DbDeleteUser

  beforeEach(() => {
    deleteUserRepository = deleteUserRepositoryMock()
    dbDeleteUser = new DbDeleteUser(deleteUserRepository)
  })

  it('should delete an user by id', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(deleteUserRepository, 'delete')
      .mockImplementationOnce(() => Promise.resolve())

    await dbDeleteUser.delete(userId)

    expect(deleteUserRepository.delete).toHaveBeenCalledWith(userId)
  })
})
