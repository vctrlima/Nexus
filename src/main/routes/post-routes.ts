import { adaptRoute } from '@/main/adapters'
import {
  makeCreatePostController,
  makeDeletePostController,
  makeFindPostByIdController,
  makeUpdatePostController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/post', adaptRoute(makeCreatePostController()))
  router.get('/post/:id', adaptRoute(makeFindPostByIdController()))
  router.put('/post/:id', adaptRoute(makeUpdatePostController()))
  router.delete('/post/:id', adaptRoute(makeDeletePostController()))
}
