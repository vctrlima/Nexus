import * as dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.SERVER_PORT || 8080,
  passwordHashSalt: 12,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || '',
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
}
