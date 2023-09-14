import { DbCreateRefreshToken } from '@server/data/use-cases'
import { CreateRefreshToken } from '@server/domain/use-cases'
import { prisma } from '@server/infra/db'
import { PrismaRefreshTokenRepository } from '@server/infra/db/repositories'

export const makeCreateRefreshToken = (): CreateRefreshToken => {
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
  return new DbCreateRefreshToken(prismaRefreshTokenRepository)
}
