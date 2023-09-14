import { makeUpdateUser } from '@server/main/factories/use-cases'
import {
  makeEmailValidation,
  makePasswordValidation,
} from '@server/main/factories/validators'
import { UpdateUserController } from '@server/presentation/controllers'

export const makeUpdateUserController = (): UpdateUserController =>
  new UpdateUserController(
    makeUpdateUser(),
    makeEmailValidation(),
    makePasswordValidation(),
  )
