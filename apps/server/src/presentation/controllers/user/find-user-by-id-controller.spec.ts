import { User } from '@server/domain/entities'
import { FindUserById } from '@server/domain/use-cases'
import { ok, serverError } from '@server/presentation/helpers'
import { HttpRequest } from '@server/presentation/protocols'
import { faker } from '@faker-js/faker'
import { FindUserByIdController } from './find-user-by-id-controller'

const findUserByIdMock = (): FindUserById => ({
  find: jest.fn(),
})

describe('FindUserByIdController', () => {
  let findUserById: FindUserById
  let findUserByIdController: FindUserByIdController

  beforeEach(() => {
    findUserById = findUserByIdMock()
    findUserByIdController = new FindUserByIdController(findUserById)
  })

  it('should find an user by id and return 200', async () => {
    const userId = faker.string.uuid()
    const foundUser: User = {
      id: userId,
      password: faker.internet.password(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
    }
    jest.spyOn(findUserById, 'find').mockResolvedValue(foundUser)
    const request: HttpRequest<{ id: string }> = {
      params: { id: userId },
    }

    const response = await findUserByIdController.handle(request)

    expect(findUserById.find).toHaveBeenCalledWith(userId)
    expect(response).toEqual(ok(foundUser))
  })

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const userId = faker.string.uuid()
    jest
      .spyOn(findUserById, 'find')
      .mockRejectedValue(new Error('Error finding user'))
    const request: HttpRequest<{ id: string }> = {
      params: { id: userId },
    }

    const response = await findUserByIdController.handle(request)

    expect(findUserById.find).toHaveBeenCalledWith(userId)
    expect(response).toEqual(serverError(new Error('Error finding user')))
  })
})
