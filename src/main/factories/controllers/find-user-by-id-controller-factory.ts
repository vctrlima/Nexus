import { makeFindUserById } from '@/main/factories/use-cases'
import { FindUserByIdController } from '@/presentation/controllers'

export const makeFindUserByIdController = (): FindUserByIdController =>
  new FindUserByIdController(makeFindUserById())
