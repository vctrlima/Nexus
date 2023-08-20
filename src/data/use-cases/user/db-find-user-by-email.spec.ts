import { UserRepository } from '@/data/protocols/db'
import { FindUserByEmail } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbFindUserByEmail } from './db-find-user-by-email'

const createUserRepositoryMock = (): UserRepository => {
  return {
    findByEmail: jest.fn(),
  } as unknown as UserRepository
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
    }
    jest
      .spyOn(userRepositoryMock, 'findByEmail')
      .mockImplementationOnce(async () => foundUser)

    const result = await dbFindUserByEmail.find(userEmail)

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(userEmail)
    expect(result).toEqual(foundUser)
  })
})
