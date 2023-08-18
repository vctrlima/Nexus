import { makeUpdatePost } from '@/main/factories/use-cases'
import { UpdatePostController } from '@/presentation/controllers'

export const makeUpdatePostController = (): UpdatePostController =>
  new UpdatePostController(makeUpdatePost())
