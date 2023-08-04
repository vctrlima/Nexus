import { makeFindPostById } from '@/main/factories/use-cases'
import { FindPostByIdController } from '@/presentation/controllers'

export const makeFindPostByIdController = (): FindPostByIdController =>
  new FindPostByIdController(makeFindPostById())
