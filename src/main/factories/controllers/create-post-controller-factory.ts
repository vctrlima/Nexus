import { makeCreatePost, makeFindPostById } from '@/main/factories/use-cases'
import { CreatePostController } from '@/presentation/controllers'

export const makeCreatePostController = (): CreatePostController =>
  new CreatePostController(makeCreatePost(), makeFindPostById())
