import { faker } from '@faker-js/faker'
import { DbFindUserByToken } from './db-find-user-by-token'

const mockDecrypter = {
  decrypt: jest.fn(),
}

const mockFindUserById = {
  find: jest.fn(),
}

const makeSut = () => {
  return new DbFindUserByToken(mockDecrypter, mockFindUserById)
}

describe('DbFindUserByToken', () => {
  it('should find an user by token', async () => {
    const sut = makeSut()
    const accessToken = faker.string.uuid()
    const userId = faker.string.uuid()
    const user = {
      id: userId,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
    }
    mockDecrypter.decrypt.mockResolvedValue(userId)
    mockFindUserById.find.mockResolvedValue(user)

    const foundUser = await sut.findUserByToken(accessToken)

    expect(foundUser).toEqual(user)
  })

  it('should throw if decrypter throws', async () => {
    const sut = makeSut()
    const accessToken = faker.string.uuid()
    mockDecrypter.decrypt.mockRejectedValue(new Error())

    const promise = sut.findUserByToken(accessToken)

    await expect(promise).rejects.toThrow()
  })

  it('should throw if findUserById throws', async () => {
    const sut = makeSut()
    const accessToken = faker.string.uuid()
    const userId = faker.string.uuid()
    mockDecrypter.decrypt.mockResolvedValue(userId)
    mockFindUserById.find.mockRejectedValue(new Error())

    const promise = sut.findUserByToken(accessToken)

    await expect(promise).rejects.toThrow()
  })

  it('should throw if user is not found', async () => {
    const sut = makeSut()
    const accessToken = faker.string.uuid()
    const userId = faker.string.uuid()
    mockDecrypter.decrypt.mockResolvedValue(userId)
    mockFindUserById.find.mockResolvedValue(null)

    const promise = sut.findUserByToken(accessToken)

    await expect(promise).rejects.toThrow()
  })
})
