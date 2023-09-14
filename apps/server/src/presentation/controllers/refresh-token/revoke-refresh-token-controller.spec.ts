import { RevokeRefreshTokenByUserId } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { RevokeRefreshTokenController } from './revoke-refresh-token-controller'
import { serverError } from '@server/presentation/helpers'

const revokeRefreshTokenByUserIdMock = (): RevokeRefreshTokenByUserId => ({
  revokeByUserId: jest.fn(),
})

describe('RevokeRefreshTokenController', () => {
  let revokeRefreshTokenByUserId: RevokeRefreshTokenByUserId
  let revokeRefreshTokenController: RevokeRefreshTokenController

  beforeEach(() => {
    revokeRefreshTokenByUserId = revokeRefreshTokenByUserIdMock()
    revokeRefreshTokenController = new RevokeRefreshTokenController(
      revokeRefreshTokenByUserId,
    )
  })

  it('should return 400 if no body is provided', async () => {
    const request = { body: undefined }

    const response = await revokeRefreshTokenController.handle(request as any)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: body'))
  })

  it('should return 400 if no userId is provided', async () => {
    const request = { body: { userId: undefined } }

    const response = await revokeRefreshTokenController.handle(request as any)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('Missing param: userId'))
  })

  it('should call RevokeRefreshTokenByUserId with correct values', async () => {
    const userId = faker.string.uuid()
    const request = { body: { userId } }

    await revokeRefreshTokenController.handle(request as any)

    expect(revokeRefreshTokenByUserId.revokeByUserId).toHaveBeenCalledWith(
      userId,
    )
  })

  it('should return 204 on success', async () => {
    const userId = faker.string.uuid()
    const request = { body: { userId } }

    const response = await revokeRefreshTokenController.handle(request as any)

    expect(response.statusCode).toBe(204)
    expect(response.body).toBeNull()
  })

  it('should return 500 if RevokeRefreshTokenByUserId throws', async () => {
    const userId = faker.string.uuid()
    const request = { body: { userId } }
    jest
      .spyOn(revokeRefreshTokenByUserId, 'revokeByUserId')
      .mockRejectedValueOnce(new Error('Error revoking refresh token'))

    const response = await revokeRefreshTokenController.handle(request as any)

    expect(revokeRefreshTokenByUserId.revokeByUserId).toHaveBeenCalledWith(
      userId,
    )
    expect(response).toEqual(
      serverError(new Error('Error revoking refresh token')),
    )
  })
})
