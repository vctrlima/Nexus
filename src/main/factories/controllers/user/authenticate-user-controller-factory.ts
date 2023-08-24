import { makeAuthenticateUser } from '@/main/factories/use-cases'
import { AuthenticateUserController } from '@/presentation/controllers/user/authenticate-user-controller'

export const makeAuthenticateUserController = () =>
  new AuthenticateUserController(makeAuthenticateUser())
