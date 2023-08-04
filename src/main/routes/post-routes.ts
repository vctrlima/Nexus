import { adaptRoute } from '@/main/adapters'
import {
  makeCreatePostController,
  makeFindPostByIdController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/post', adaptRoute(makeCreatePostController()))
  router.get('/post/:id', adaptRoute(makeFindPostByIdController()))
}
