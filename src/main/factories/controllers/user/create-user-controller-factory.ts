import { makeCreateUser, makeFindUserById } from '@/main/factories/use-cases'
import {
  makeEmailValidation,
  makePasswordValidation,
} from '@/main/factories/validators'
import { CreateUserController } from '@/presentation/controllers'

export const makeCreateUserController = (): CreateUserController =>
  new CreateUserController(
    makeCreateUser(),
    makeFindUserById(),
    makeEmailValidation(),
    makePasswordValidation(),
  )
