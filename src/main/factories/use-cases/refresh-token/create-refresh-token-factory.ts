import { DbCreateRefreshToken } from '@/data/use-cases'
import { CreateRefreshToken } from '@/domain/use-cases'
import { prisma } from '@/infra/db'
import { PrismaRefreshTokenRepository } from '@/infra/db/repositories'

export const makeCreateRefreshToken = (): CreateRefreshToken => {
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
  return new DbCreateRefreshToken(prismaRefreshTokenRepository)
}
