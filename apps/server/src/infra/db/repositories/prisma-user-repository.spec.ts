import {
  CreateUserRepository,
  DeleteUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  UpdateUserRepository,
} from '@server/data/protocols/db'
import { ServerError } from '@server/presentation/errors'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { PrismaUserRepository } from './prisma-user-repository'

type UserRepository = CreateUserRepository &
  FindUserByEmailRepository &
  FindUserByIdRepository &
  UpdateUserRepository &
  DeleteUserRepository

const prismaClientMock = (): PrismaClient =>
  ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }) as any

describe('PrismaUserRepository', () => {
  let prisma: PrismaClient
  let prismaUserRepository: UserRepository

  beforeEach(() => {
    prisma = prismaClientMock()
    prismaUserRepository = new PrismaUserRepository(prisma)
  })

  it('should create a new user', async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const createdUserId = faker.string.uuid()
    jest.spyOn(prisma.user, 'create').mockResolvedValue({
      id: createdUserId,
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    })

    const result = await prismaUserRepository.create(newUser)

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: newUser.email,
        password: newUser.password,
        name: newUser.name,
      },
    })
    expect(result).toEqual({ id: createdUserId })
  })

  describe('findById', () => {
    it('should find an user by id', async () => {
      const userId = faker.string.uuid()
      const foundUser = {
        id: userId,
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.person.fullName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        id: userId,
        email: foundUser.email,
        password: foundUser.password,
        name: foundUser.name,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
      })

      const result = await prismaUserRepository.findById(userId)

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          posts: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      expect(result).toEqual(foundUser)
    })

    it('should throw ServerError if user is not found', async () => {
      const userId = faker.string.uuid()
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(undefined as any)

      const result = prismaUserRepository.findById(userId)

      await expect(result).rejects.toThrowError(
        new ServerError('User not found'),
      )
    })
  })

  describe('findById', () => {
    it('should find an user by email', async () => {
      const userEmail = faker.internet.email()
      const foundUser = {
        id: faker.string.uuid(),
        email: userEmail,
        password: faker.internet.password(),
        name: faker.person.fullName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
        id: foundUser.id,
        email: foundUser.email,
        password: foundUser.password,
        name: foundUser.name,
        createdAt: foundUser.createdAt,
        updatedAt: foundUser.updatedAt,
      })

      const result = await prismaUserRepository.findByEmail(userEmail)

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: userEmail },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          posts: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      expect(result).toEqual(foundUser)
    })

    it('should throw ServerError if user is not found', async () => {
      const userEmail = faker.internet.email()
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(undefined as any)

      const result = prismaUserRepository.findByEmail(userEmail)

      await expect(result).rejects.toThrowError(
        new ServerError('User not found'),
      )
    })
  })

  it('should update an user', async () => {
    const updatedUser = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest.spyOn(prisma.user, 'update').mockResolvedValue({
      id: updatedUser.id,
      email: updatedUser.email,
      password: updatedUser.password,
      name: updatedUser.name,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    })

    const result = await prismaUserRepository.update(updatedUser)

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: updatedUser.id },
      data: {
        id: updatedUser.id,
        email: updatedUser.email,
        password: updatedUser.password,
        name: updatedUser.name,
      },
    })
    expect(result).toEqual({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      password: updatedUser.password,
      posts: undefined,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    })
  })

  it('should delete an user by id', async () => {
    const userId = faker.string.uuid()

    await prismaUserRepository.delete(userId)

    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: userId } })
  })
})
