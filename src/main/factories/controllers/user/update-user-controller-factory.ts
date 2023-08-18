import { makeUpdateUser } from '@/main/factories/use-cases'
import {
  makeEmailValidation,
  makePasswordValidation,
} from '@/main/factories/validators'
import { UpdateUserController } from '@/presentation/controllers'

export const makeUpdateUserController = (): UpdateUserController =>
  new UpdateUserController(
    makeUpdateUser(),
    makeEmailValidation(),
    makePasswordValidation(),
  )
