import { AuthenticateUser } from '@server/domain/use-cases'
import { badRequest, ok, unauthorized } from '@server/presentation/helpers'
import { faker } from '@faker-js/faker'
import { AuthenticateUserController } from './authenticate-user-controller'

const authenticateUserMock = (): AuthenticateUser => ({
  auth: jest.fn(),
})

describe('AuthenticateUserController', () => {
  let authenticateUser: AuthenticateUser
  let authenticateUserController: AuthenticateUserController

  beforeEach(() => {
    authenticateUser = authenticateUserMock()
    authenticateUserController = new AuthenticateUserController(
      authenticateUser,
    )
  })

  it('should authenticate an user and return 200', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const user = {
      id: faker.string.uuid(),
      email,
      name: faker.person.fullName(),
    }
    const accessToken = faker.string.uuid()
    const refreshToken = faker.string.uuid()
    jest
      .spyOn(authenticateUser, 'auth')
      .mockResolvedValue({ accessToken, refreshToken, user })
    const request = {
      body: { email, password },
    }

    const response = await authenticateUserController.handle(request)

    expect(authenticateUser.auth).toHaveBeenCalledWith({ email, password })
    expect(response).toEqual(ok({ accessToken, refreshToken, user }))
  })

  it('should return 400 Bad Request if no body is provided', async () => {
    const request = { body: undefined }

    const response = await authenticateUserController.handle(request)

    expect(response).toEqual(badRequest(new Error('Missing param: body')))
  })

  it('should return 400 Bad Request if no email is provided', async () => {
    const password = faker.internet.password()
    const request = { body: { password } }

    const response = await authenticateUserController.handle(request as any)

    expect(response).toEqual(badRequest(new Error('Missing param: email')))
  })

  it('should return 400 Bad Request if no password is provided', async () => {
    const email = faker.internet.email()
    const request = { body: { email } }

    const response = await authenticateUserController.handle(request as any)

    expect(response).toEqual(badRequest(new Error('Missing param: password')))
  })

  it('should return 401 Unauthorized Error if an error occurs', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    jest
      .spyOn(authenticateUser, 'auth')
      .mockRejectedValue(new Error('Error authenticating user'))
    const request = {
      body: { email, password },
    }

    const response = await authenticateUserController.handle(request)

    expect(authenticateUser.auth).toHaveBeenCalledWith({ email, password })
    expect(response).toEqual(unauthorized())
  })
})
