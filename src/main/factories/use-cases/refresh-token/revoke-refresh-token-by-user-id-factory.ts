import { DbRevokeRefreshTokenByUserId } from '@/data/use-cases'
import { RevokeRefreshTokenByUserId } from '@/domain/use-cases'
import { prisma } from '@/infra/db'
import { PrismaRefreshTokenRepository } from '@/infra/db/repositories'

export const makeRevokeRefreshTokenByUserId =
  (): RevokeRefreshTokenByUserId => {
    const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(
      prisma,
    )
    return new DbRevokeRefreshTokenByUserId(prismaRefreshTokenRepository)
  }
