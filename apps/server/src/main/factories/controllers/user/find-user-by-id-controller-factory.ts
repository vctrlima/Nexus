import { makeFindUserById } from '@server/main/factories/use-cases'
import { FindUserByIdController } from '@server/presentation/controllers'

export const makeFindUserByIdController = (): FindUserByIdController =>
  new FindUserByIdController(makeFindUserById())
