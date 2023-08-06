import { UserRepository } from '@/data/protocols/db'
import { User } from '@/domain/entities'
import env from '@/main/config/env'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'
import { PrismaUserRepository } from './prisma-user-repository'

const prismaClientMock = (): PrismaClient =>
  ({
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
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
    const hashedPassword = hashSync(
      faker.internet.password(),
      env.passwordHashSalt,
    )
    const newUser: User = {
      email: faker.internet.email(),
      password: hashedPassword,
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

  it('should find a user by id', async () => {
    const userId = faker.string.uuid()
    const foundUser: User = {
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
        name: true,
        posts: true,
        updatedAt: true,
      },
    })
    expect(result).toEqual(foundUser)
  })

  it('should update an user', async () => {
    const hashedPassword = hashSync(
      faker.internet.password(),
      env.passwordHashSalt,
    )
    const updatedUser: User = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      password: hashedPassword,
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
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    })
    expect(result).toEqual({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    })
  })
})
