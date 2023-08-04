import * as dotenv from 'dotenv'
dotenv.config()

export default {
  port: process.env.APP_PORT || 8080,
  passwordHashSalt: 12,
}
