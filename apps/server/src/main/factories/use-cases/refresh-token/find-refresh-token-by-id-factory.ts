import { DbFindRefreshTokenById } from '@server/data/use-cases'
import { FindRefreshTokenById } from '@server/domain/use-cases'
import { prisma } from '@server/infra/db'
import { PrismaRefreshTokenRepository } from '@server/infra/db/repositories'

export const makeFindRefreshTokenById = (): FindRefreshTokenById => {
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
  return new DbFindRefreshTokenById(prismaRefreshTokenRepository)
}
