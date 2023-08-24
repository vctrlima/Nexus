import { DbFindRefreshTokenById } from '@/data/use-cases'
import { FindRefreshTokenById } from '@/domain/use-cases'
import { prisma } from '@/infra/db'
import { PrismaRefreshTokenRepository } from '@/infra/db/repositories'

export const makeFindRefreshTokenById = (): FindRefreshTokenById => {
  const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
  return new DbFindRefreshTokenById(prismaRefreshTokenRepository)
}
