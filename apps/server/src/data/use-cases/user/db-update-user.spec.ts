import { Hasher } from '@server/data/protocols/cryptography'
import { UpdateUserRepository } from '@server/data/protocols/db'
import { UpdateUser } from '@server/domain/use-cases'
import { faker } from '@faker-js/faker'
import { DbUpdateUser } from './db-update-user'

const updateUserRepositoryMock = (): UpdateUserRepository => {
  return {
    update: jest.fn(),
  } as UpdateUserRepository
}

const hasherMock = (): Hasher => {
  return {
    hash: jest.fn(),
  } as Hasher
}

describe('DbUpdateUser', () => {
  let updateUserRepository: UpdateUserRepository
  let hasher: Hasher
  let dbUpdateUser: DbUpdateUser

  beforeEach(() => {
    updateUserRepository = updateUserRepositoryMock()
    hasher = hasherMock()
    dbUpdateUser = new DbUpdateUser(updateUserRepository, hasher)
  })

  it('should update an existent user', async () => {
    const updateParams: UpdateUser.Params = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const updatedUser: UpdateUser.Model = { ...updateParams }
    jest
      .spyOn(updateUserRepository, 'update')
      .mockImplementationOnce(async () => updatedUser)

    const result = await dbUpdateUser.update(updateParams)

    expect(updateUserRepository.update).toHaveBeenCalledWith(updateParams)
    expect(result).toEqual(updatedUser)
  })
})
