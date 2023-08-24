import { DbDeleteRefreshToken } from '@/data/use-cases'
import { prisma } from '@/infra/db'
import { PrismaRefreshTokenRepository } from '@/infra/db/repositories'

export const makeDeleteRefreshToken = () => {
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
  return new DbDeleteRefreshToken(prismaRefreshTokenRepository)
}
