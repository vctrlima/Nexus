import {
  CreateUserRepository,
  DeleteUserRepository,
  FindUserByEmailRepository,
  FindUserByIdRepository,
  UpdateUserRepository,
} from '@server/data/protocols/db'
import { User } from '@server/domain/entities'
import { ServerError } from '@server/presentation/errors'
import { PrismaClient } from '@prisma/client'

export class PrismaUserRepository
  implements
    CreateUserRepository,
    FindUserByEmailRepository,
    FindUserByIdRepository,
    UpdateUserRepository,
    DeleteUserRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<{ id: string }> {
    const { id } = await this.prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
        name: user.name,
      },
    })
    return { id }
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
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
    if (!user) throw new ServerError('User not found')
    return new User({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      posts: user.posts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
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
    if (!user) throw new ServerError('User not found')
    return new User({
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
      posts: user.posts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  }

  async update(user: User): Promise<User> {
    const { id, email, password, name, createdAt, updatedAt } =
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          password: user.password,
        },
      })
    return new User({ id, email, password, name, createdAt, updatedAt })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }
}
