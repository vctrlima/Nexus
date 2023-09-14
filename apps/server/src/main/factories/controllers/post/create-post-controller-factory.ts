import { makeCreatePost, makeFindPostById } from '@server/main/factories/use-cases'
import { CreatePostController } from '@server/presentation/controllers'

export const makeCreatePostController = (): CreatePostController =>
  new CreatePostController(makeCreatePost(), makeFindPostById())
