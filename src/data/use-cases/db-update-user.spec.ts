import { UserRepository } from '@/data/protocols/db'
import { UpdateUser } from '@/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbUpdateUser } from './db-update-user'

const updateUserRepositoryMock = (): UserRepository => {
  return {
    update: jest.fn(),
  } as UserRepository
}

describe('DbUpdateUser', () => {
  let userRepositoryMock: UserRepository
  let dbUpdateUser: DbUpdateUser

  beforeEach(() => {
    userRepositoryMock = updateUserRepositoryMock()
    dbUpdateUser = new DbUpdateUser(userRepositoryMock)
  })

  it('should update an existent user', async () => {
    const updateParams: UpdateUser.Params = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const updatedUser: UpdateUser.Model = { id: faker.string.uuid() }
    jest
      .spyOn(userRepositoryMock, 'update')
      .mockImplementationOnce(async () => updatedUser)

    const result = await dbUpdateUser.update(updateParams)

    expect(userRepositoryMock.update).toHaveBeenCalledWith(updateParams)
    expect(result).toEqual(updatedUser)
  })
})
