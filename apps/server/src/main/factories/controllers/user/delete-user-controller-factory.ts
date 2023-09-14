import { makeDeleteUser } from '@server/main/factories/use-cases'
import { DeleteUserController } from '@server/presentation/controllers'

export const makeDeleteUserController = (): DeleteUserController =>
  new DeleteUserController(makeDeleteUser())
