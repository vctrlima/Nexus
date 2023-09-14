import { makeAuthenticateUser } from '@server/main/factories/use-cases'
import { AuthenticateUserController } from '@server/presentation/controllers/user/authenticate-user-controller'

export const makeAuthenticateUserController = () =>
  new AuthenticateUserController(makeAuthenticateUser())
