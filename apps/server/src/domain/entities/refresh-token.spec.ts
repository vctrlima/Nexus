import { faker } from '@faker-js/faker'
import { RefreshToken } from './refresh-token'
import { User } from './user'

describe('RefreshToken', () => {
  it('should create a new RefreshToken instance', () => {
    const userId = faker.string.uuid()
    const userEmail = faker.internet.email()
    const userPassword = faker.internet.password()
    const userName = faker.person.fullName()
    const refreshTokenId = faker.string.uuid()
    const refreshTokenHashedToken = faker.string.alphanumeric()
    const refreshTokenRevoked = faker.datatype.boolean()

    const user = new User({
      id: userId,
      email: userEmail,
      password: userPassword,
      name: userName,
    })
    const refreshToken = new RefreshToken({
      id: refreshTokenId,
      hashedToken: refreshTokenHashedToken,
      user,
      revoked: refreshTokenRevoked,
    })

    expect(refreshToken.id).toBe(refreshTokenId)
    expect(refreshToken.hashedToken).toBe(refreshTokenHashedToken)
    expect(refreshToken.user).toStrictEqual(user)
    expect(refreshToken.revoked).toBe(refreshTokenRevoked)
  })

  it('should have an undefined id when not provided', () => {
    const userId = faker.string.uuid()
    const userEmail = faker.internet.email()
    const userPassword = faker.internet.password()
    const userName = faker.person.fullName()
    const refreshTokenHashedToken = faker.string.alphanumeric()
    const refreshTokenRevoked = faker.datatype.boolean()

    const user = new User({
      id: userId,
      email: userEmail,
      password: userPassword,
      name: userName,
    })
    const refreshToken = new RefreshToken({
      id: undefined,
      hashedToken: refreshTokenHashedToken,
      user,
      revoked: refreshTokenRevoked,
    })

    expect(refreshToken.id).toBeUndefined()
    expect(refreshToken.hashedToken).toBe(refreshTokenHashedToken)
    expect(refreshToken.user).toStrictEqual(user)
    expect(refreshToken.revoked).toBe(refreshTokenRevoked)
  })

  it('should have a revoked false when not provided', () => {
    const userId = faker.string.uuid()
    const userEmail = faker.internet.email()
    const userPassword = faker.internet.password()
    const userName = faker.person.fullName()
    const refreshTokenHashedToken = faker.string.alphanumeric()

    const user = new User({
      id: userId,
      email: userEmail,
      password: userPassword,
      name: userName,
    })
    const refreshToken = new RefreshToken({
      id: undefined,
      hashedToken: refreshTokenHashedToken,
      user,
    })

    expect(refreshToken.id).toBeUndefined()
    expect(refreshToken.hashedToken).toBe(refreshTokenHashedToken)
    expect(refreshToken.user).toStrictEqual(user)
    expect(refreshToken.revoked).toBe(false)
  })
})
