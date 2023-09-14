import {
  CreateRefreshTokenRepository,
  DeleteRefreshTokenRepository,
  FindRefreshTokenByIdRepository,
  RevokeRefreshTokenByUserIdRepository,
} from '@server/data/protocols/db'
import { RefreshToken } from '@server/domain/entities'
import { ServerError } from '@server/presentation/errors'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { PrismaRefreshTokenRepository } from './prisma-refresh-token-repository'

type RefreshTokenRepository = CreateRefreshTokenRepository &
  FindRefreshTokenByIdRepository &
  DeleteRefreshTokenRepository &
  RevokeRefreshTokenByUserIdRepository

const prismaClientMock = (): PrismaClient =>
  ({
    refreshToken: {
      create: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      updateMany: jest.fn(),
    },
  }) as any

describe('PrismaRefreshTokenRepository', () => {
  let prisma: PrismaClient
  let prismaRefreshTokenRepository: RefreshTokenRepository

  beforeEach(() => {
    prisma = prismaClientMock()
    prismaRefreshTokenRepository = new PrismaRefreshTokenRepository(prisma)
  })

  it('should create a refresh token', async () => {
    const newRefreshToken = {
      jti: faker.string.uuid(),
      refreshToken: faker.string.uuid(),
      userId: faker.string.uuid(),
      revoked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest.spyOn(prisma.refreshToken, 'create').mockResolvedValue({
      id: newRefreshToken.jti,
      hashedToken: newRefreshToken.refreshToken,
      userId: newRefreshToken.userId,
      revoked: newRefreshToken.revoked,
      createdAt: newRefreshToken.createdAt,
      updatedAt: newRefreshToken.updatedAt,
    })

    const result = await prismaRefreshTokenRepository.create(newRefreshToken)

    expect(prisma.refreshToken.create).toHaveBeenCalledWith({
      data: {
        id: newRefreshToken.jti,
        hashedToken: newRefreshToken.refreshToken,
        userId: newRefreshToken.userId,
      },
    })
    expect(result).toEqual(
      new RefreshToken({
        id: newRefreshToken.jti,
        hashedToken: newRefreshToken.refreshToken,
        revoked: newRefreshToken.revoked,
      }),
    )
  })

  describe('findById', () => {
    it('should find a refresh token by id', async () => {
      const refreshTokenId = faker.string.uuid()
      const foundRefreshToken = {
        id: refreshTokenId,
        hashedToken: faker.string.uuid(),
        userId: faker.string.uuid(),
        revoked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      jest
        .spyOn(prisma.refreshToken, 'findUnique')
        .mockResolvedValue(foundRefreshToken)

      const result = await prismaRefreshTokenRepository.findById(refreshTokenId)

      expect(prisma.refreshToken.findUnique).toHaveBeenCalledWith({
        include: { user: true },
        where: { id: refreshTokenId },
      })
      expect(result).toEqual(
        new RefreshToken({
          id: foundRefreshToken.id,
          hashedToken: foundRefreshToken.hashedToken,
          revoked: foundRefreshToken.revoked,
        }),
      )
    })

    it('should throw if refresh token is not found', async () => {
      const refreshTokenId = faker.string.uuid()
      jest.spyOn(prisma.refreshToken, 'findUnique').mockResolvedValue(null)

      const promise = prismaRefreshTokenRepository.findById(refreshTokenId)

      await expect(promise).rejects.toThrowError(
        new ServerError('Refresh Token not found'),
      )
    })
  })

  it('should delete a refresh token by id', async () => {
    const refreshTokenId = faker.string.uuid()

    await prismaRefreshTokenRepository.delete(refreshTokenId)

    expect(prisma.refreshToken.delete).toHaveBeenCalledWith({
      where: { id: refreshTokenId },
    })
  })

  it('should revoke refresh tokens by user id', async () => {
    const userId = faker.string.uuid()

    await prismaRefreshTokenRepository.revokeByUserId(userId)

    expect(prisma.refreshToken.updateMany).toHaveBeenCalledWith({
      where: { userId },
      data: { revoked: true },
    })
  })
})
