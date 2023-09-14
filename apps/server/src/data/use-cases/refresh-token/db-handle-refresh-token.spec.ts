import { UnauthorizedError } from '@server/presentation/errors'
import { DbHandleRefreshToken } from './db-handle-refresh-token'

const mockDecrypter = {
  decrypt: jest.fn(),
}

const mockEncrypter = {
  encrypt: jest.fn(),
}

const mockFindRefreshTokenById = {
  find: jest.fn(),
}

const mockFindUserById = {
  find: jest.fn(),
}

const mockDeleteRefreshToken = {
  delete: jest.fn(),
}

const mockCreateRefreshToken = {
  create: jest.fn(),
}

const makeSut = () => {
  return new DbHandleRefreshToken(
    mockDecrypter,
    mockEncrypter,
    mockFindRefreshTokenById,
    mockFindUserById,
    mockDeleteRefreshToken,
    mockCreateRefreshToken,
  )
}

describe('DbHandleRefreshToken', () => {
  it('should throw UnauthorizedError if savedRefreshToken is not valid or revoked', async () => {
    const sut = makeSut()
    mockDecrypter.decrypt.mockResolvedValue({ jti: 'someJti' })
    mockFindRefreshTokenById.find.mockResolvedValue(null)

    await expect(
      sut.handle({ refreshToken: 'someToken' }),
    ).rejects.toThrowError(UnauthorizedError)

    mockFindRefreshTokenById.find.mockResolvedValue({
      id: 'someId',
      user: { id: 'someUserId' },
      revoked: true,
    })

    await expect(
      sut.handle({ refreshToken: 'someToken' }),
    ).rejects.toThrowError(UnauthorizedError)
  })

  it('should throw UnauthorizedError if user is not found', async () => {
    const sut = makeSut()
    mockDecrypter.decrypt.mockResolvedValue({ jti: 'someJti' })
    mockFindRefreshTokenById.find.mockResolvedValue({
      id: 'someId',
      user: { id: 'someUserId' },
      revoked: false,
    })
    mockFindUserById.find.mockResolvedValue(null)

    await expect(
      sut.handle({ refreshToken: 'someToken' }),
    ).rejects.toThrowError(UnauthorizedError)
  })

  it('should handle refresh token generation and return tokens', async () => {
    const sut = makeSut()
    const mockUser = { id: 'someUserId' }
    const mockRefreshToken = 'mockedRefreshToken'
    const mockAccessToken = 'mockedAccessToken'
    mockDecrypter.decrypt.mockResolvedValue({ jti: 'someJti' })
    mockFindRefreshTokenById.find.mockResolvedValue({
      id: 'someId',
      user: { id: 'someUserId' },
      revoked: false,
    })
    mockFindUserById.find.mockResolvedValue(mockUser)
    mockEncrypter.encrypt.mockResolvedValueOnce(mockRefreshToken)
    mockEncrypter.encrypt.mockResolvedValueOnce(mockAccessToken)

    const result = await sut.handle({ refreshToken: 'someToken' })

    expect(result.accessToken).toBe(mockAccessToken)
    expect(result.refreshToken).toBe(mockRefreshToken)
  })
})
