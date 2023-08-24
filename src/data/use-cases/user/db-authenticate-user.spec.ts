import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import { RefreshTokenRepository, UserRepository } from '@/data/protocols/db'
import { FindUserByEmail } from '@/domain/use-cases'
import { AccessDeniedError } from '@/presentation/errors'
import { faker } from '@faker-js/faker'
import { DbAuthenticateUser } from './db-authenticate-user'

const findUserByEmailRepositoryMock = (): UserRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as UserRepository
}

const createRefreshTokenRepositoryMock = (): RefreshTokenRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    revokeByUserId: jest.fn(),
  } as RefreshTokenRepository
}

const hashComparerMock = (): HashComparer => {
  return {
    compare: jest.fn(),
  } as HashComparer
}

const encrypterMock = (): Encrypter => {
  return {
    encrypt: jest.fn(),
  } as Encrypter
}

describe('DbAuthenticateUser', () => {
  let userRepositoryMock: UserRepository
  let refreshTokenRepositoryMock: RefreshTokenRepository
  let hashComparer: HashComparer
  let encrypter: Encrypter
  let dbAuthenticateUser: DbAuthenticateUser

  beforeEach(() => {
    userRepositoryMock = findUserByEmailRepositoryMock()
    refreshTokenRepositoryMock = createRefreshTokenRepositoryMock()
    hashComparer = hashComparerMock()
    encrypter = encrypterMock()
    dbAuthenticateUser = new DbAuthenticateUser(
      userRepositoryMock,
      refreshTokenRepositoryMock,
      hashComparer,
      encrypter,
    )
  })

  it('should authenticate an user', async () => {
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const foundUser: FindUserByEmail.Model = {
      id: faker.string.uuid(),
      email: params.email,
      name: faker.person.fullName(),
      password: faker.internet.password(),
    }
    const accessToken = faker.string.uuid()
    const refreshToken = faker.string.uuid()
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => foundUser)
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(async () => true)
    jest
      .spyOn(encrypter, 'encrypt')
      .mockImplementationOnce(async () => accessToken)
    jest
      .spyOn(encrypter, 'encrypt')
      .mockImplementationOnce(async () => refreshToken)

    const result = await dbAuthenticateUser.auth(params)

    expect(result).toEqual({
      accessToken,
      refreshToken,
      user: { id: foundUser.id, email: foundUser.email, name: foundUser.name },
    })
  })

  it('should throw AccessDeniedError if user is not found', async () => {
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => null)

    const promise = dbAuthenticateUser.auth(params)

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw AccessDeniedError if user id is undefined', async () => {
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const foundUser: FindUserByEmail.Model = {
      id: undefined,
      email: params.email,
      name: faker.person.fullName(),
      password: faker.internet.password(),
    }
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => foundUser)

    const promise = dbAuthenticateUser.auth(params)

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('should throw AccessDeniedError if password is invalid', async () => {
    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const foundUser: FindUserByEmail.Model = {
      id: faker.string.uuid(),
      email: params.email,
      name: faker.person.fullName(),
      password: faker.internet.password(),
    }
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => foundUser)
    jest
      .spyOn(hashComparer, 'compare')
      .mockImplementationOnce(async () => false)

    const promise = dbAuthenticateUser.auth(params)

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })
})
