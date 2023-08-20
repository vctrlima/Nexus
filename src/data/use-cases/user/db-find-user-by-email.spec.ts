import { UserRepository } from '@/data/protocols/db'
import { FindUserByEmail } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindUserByEmail } from './db-find-user-by-email'

const createUserRepositoryMock = (): UserRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as UserRepository
}

describe('DbFindUserByEmail', () => {
  let userRepositoryMock: UserRepository
  let dbFindUserByEmail: DbFindUserByEmail

  beforeEach(() => {
    userRepositoryMock = createUserRepositoryMock()
    dbFindUserByEmail = new DbFindUserByEmail(userRepositoryMock)
  })

  it('should find an user by email', async () => {
    const userEmail = faker.internet.email()
    const foundUser: FindUserByEmail.Model = {
      id: faker.string.uuid(),
      email: userEmail,
      name: faker.person.fullName(),
      password: faker.internet.password(),
    }
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => foundUser)

    const result = await dbFindUserByEmail.find(userEmail)

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(userEmail)
    expect(result).toEqual(foundUser)
  })

  it('should throw Error if user is not found', async () => {
    const userEmail = faker.internet.email()
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => undefined as any)

    const result = dbFindUserByEmail.find(userEmail)

    await expect(result).rejects.toThrowError('User not found')
  })
})
