import { UserRepository } from '@/data/protocols/db'
import { User } from '@/domain/entities'
import env from '@/main/config/env'
import { PrismaClient } from '@prisma/client'
import { hashSync } from 'bcrypt'

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: User): Promise<{ id: string }> {
    user.password = hashSync(user.password, env.passwordHashSalt)
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
    return await this.prisma.user.findUnique({ where: { id } })
  }
}
