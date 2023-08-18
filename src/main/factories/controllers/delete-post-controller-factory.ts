import { makeDeletePost } from '@/main/factories/use-cases'
import { DeletePostController } from '@/presentation/controllers'

export const makeDeletePostController = (): DeletePostController =>
  new DeletePostController(makeDeletePost())
