import { DbDeleteRefreshToken } from '@server/data/use-cases'
import { prisma } from '@server/infra/db'
import { PrismaRefreshTokenRepository } from '@server/infra/db/repositories'

export const makeDeleteRefreshToken = () => {
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
  return new DbDeleteRefreshToken(prismaRefreshTokenRepository)
}
