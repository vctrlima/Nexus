import { makeCreateUser, makeFindUserById } from '@server/main/factories/use-cases'
import {
  makeEmailValidation,
  makePasswordValidation,
} from '@server/main/factories/validators'
import { CreateUserController } from '@server/presentation/controllers'

export const makeCreateUserController = (): CreateUserController =>
  new CreateUserController(
    makeCreateUser(),
    makeFindUserById(),
    makeEmailValidation(),
    makePasswordValidation(),
  )
