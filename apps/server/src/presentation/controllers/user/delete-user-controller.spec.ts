import { DeleteUser } from '@server/domain/use-cases'
import { noContent, serverError } from '@server/presentation/helpers'
import { HttpRequest } from '@server/presentation/protocols'
import { faker } from '@faker-js/faker'
import { DeleteUserController } from './delete-user-controller'

const deleteUserMock = (): DeleteUser => ({
  delete: jest.fn(),
})

describe('DeleteUserController', () => {
  let deleteUser: DeleteUser
  let deleteUserController: DeleteUserController

  beforeEach(() => {
    deleteUser = deleteUserMock()
    deleteUserController = new DeleteUserController(deleteUser)
  })

  it('should delete an user by id and return 204', async () => {
    const userId = faker.string.uuid()
    jest.spyOn(deleteUser, 'delete').mockResolvedValue()
    const request: HttpRequest<{ id: string }> = {
      params: { id: userId },
    }

    const response = await deleteUserController.handle(request)

    expect(deleteUser.delete).toHaveBeenCalledWith(userId)
    expect(response).toEqual(noContent())
  })

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(deleteUser, 'delete')
      .mockRejectedValue(new Error('Error deleting user'))
    const request: HttpRequest<{ id: string }> = {
      params: { id: userId },
    }

    const response = await deleteUserController.handle(request)

    expect(deleteUser.delete).toHaveBeenCalledWith(userId)
    expect(response).toEqual(serverError(new Error('Error deleting user')))
  })
})
