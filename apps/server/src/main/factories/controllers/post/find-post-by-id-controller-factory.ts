import { makeFindPostById } from '@server/main/factories/use-cases'
import { FindPostByIdController } from '@server/presentation/controllers'

export const makeFindPostByIdController = (): FindPostByIdController =>
  new FindPostByIdController(makeFindPostById())
