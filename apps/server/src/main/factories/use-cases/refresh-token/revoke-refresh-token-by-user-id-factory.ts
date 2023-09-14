import { DbRevokeRefreshTokenByUserId } from '@server/data/use-cases'
import { RevokeRefreshTokenByUserId } from '@server/domain/use-cases'
import { prisma } from '@server/infra/db'
import { PrismaRefreshTokenRepository } from '@server/infra/db/repositories'

export const makeRevokeRefreshTokenByUserId =
  (): RevokeRefreshTokenByUserId => {
    const prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(
      prisma,
    )
    return new DbRevokeRefreshTokenByUserId(prismaRefreshTokenRepository)
  }
