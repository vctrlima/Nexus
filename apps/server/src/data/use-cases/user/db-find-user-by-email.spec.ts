import { FindUserByEmailRepository } from '@server/data/protocols/db'
import { FindUserByEmail } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindUserByEmail } from './db-find-user-by-email'

const findUserByEmailRepositoryMock = (): FindUserByEmailRepository => {
  return {
    create: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as FindUserByEmailRepository
}

describe('DbFindUserByEmail', () => {
  let findUserByEmailRepository: FindUserByEmailRepository
  let dbFindUserByEmail: DbFindUserByEmail

  beforeEach(() => {
    findUserByEmailRepository = findUserByEmailRepositoryMock()
    dbFindUserByEmail = new DbFindUserByEmail(findUserByEmailRepository)
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
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockImplementationOnce(async () => foundUser)

    const result = await dbFindUserByEmail.find(userEmail)

    expect(findUserByEmailRepository.findByEmail).toHaveBeenCalledWith(
      userEmail,
    )
    expect(result).toEqual(foundUser)
  })

  it('should throw Error if user is not found', async () => {
    const userEmail = faker.internet.email()
    jest
      .spyOn(findUserByEmailRepository, 'findByEmail')
      .mockImplementationOnce(async () => undefined as any)

    const result = dbFindUserByEmail.find(userEmail)

    await expect(result).rejects.toThrowError('User not found')
  })
})
