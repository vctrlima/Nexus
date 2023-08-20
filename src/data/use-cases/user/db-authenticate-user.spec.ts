import { Encrypter, HashComparer } from '@/data/protocols/cryptography'
import { UserRepository } from '@/data/protocols/db'
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
  let hashComparer: HashComparer
  let encrypter: Encrypter
  let dbAuthenticateUser: DbAuthenticateUser

  beforeEach(() => {
    userRepositoryMock = findUserByEmailRepositoryMock()
    hashComparer = hashComparerMock()
    encrypter = encrypterMock()
    dbAuthenticateUser = new DbAuthenticateUser(
      userRepositoryMock,
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
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => foundUser)
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(async () => true)
    const accessToken = faker.string.uuid()
    jest
      .spyOn(encrypter, 'encrypt')
      .mockImplementationOnce(async () => accessToken)

    const result = await dbAuthenticateUser.auth(params)

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(params.email)
    expect(hashComparer.compare).toHaveBeenCalledWith(
      params.password,
      foundUser.password,
    )
    expect(encrypter.encrypt).toHaveBeenCalledWith(foundUser.id)
    expect(result).toEqual({
      accessToken,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
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
