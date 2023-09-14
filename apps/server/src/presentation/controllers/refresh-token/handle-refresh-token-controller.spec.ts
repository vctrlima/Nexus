import { HandleRefreshToken } from '@server/domain/use-cases'
import { serverError } from '@server/presentation/helpers'
import { faker } from '@faker-js/faker'
import { HandleRefreshTokenController } from './handle-refresh-token-controller'

const handleRefreshTokenMock = (): HandleRefreshToken => ({ handle: jest.fn() })

describe('HandleRefreshTokenController', () => {
  let handleRefreshToken: HandleRefreshToken
  let handleRefreshTokenController: HandleRefreshTokenController

  beforeEach(() => {
    handleRefreshToken = handleRefreshTokenMock()
    handleRefreshTokenController = new HandleRefreshTokenController(
      handleRefreshToken,
    )
  })

  it('should return 400 if no body is provided', async () => {
    const request = { body: undefined }

    const response = await handleRefreshTokenController.handle(request as any)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: body'))
  })

  it('should return 400 if no refreshToken is provided', async () => {
    const request = { body: { refreshToken: undefined } }

    const response = await handleRefreshTokenController.handle(request as any)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: refreshToken'))
  })

  it('should call HandleRefreshToken with correct values', async () => {
    const refreshToken = faker.string.uuid()
    const request = { body: { refreshToken } }

    await handleRefreshTokenController.handle(request as any)

    expect(handleRefreshToken.handle).toHaveBeenCalledWith({ refreshToken })
  })

  it('should return 200 on success', async () => {
    const refreshToken = faker.string.uuid()
    const accessToken = faker.string.uuid()
    const request = { body: { refreshToken } }
    jest
      .spyOn(handleRefreshToken, 'handle')
      .mockResolvedValueOnce({ accessToken, refreshToken })

    const response = await handleRefreshTokenController.handle(request as any)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ accessToken, refreshToken })
  })

  it('should return 500 if HandleRefreshToken throws', async () => {
    const refreshToken = faker.string.uuid()
    const request = { body: { refreshToken } }
    jest
      .spyOn(handleRefreshToken, 'handle')
      .mockRejectedValueOnce(new Error('Error handling refresh token'))

    const response = await handleRefreshTokenController.handle(request as any)

    expect(response).toEqual(
      serverError(new Error('Error handling refresh token')),
    )
  })
})
