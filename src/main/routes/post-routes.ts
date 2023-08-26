import { adaptRoute } from '@/main/adapters'
import {
  makeCreatePostController,
  makeDeletePostController,
  makeFindPostByIdController,
  makeUpdatePostController,
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/post', auth, adaptRoute(makeCreatePostController()))
  router.get('/post/:id', auth, adaptRoute(makeFindPostByIdController()))
  router.put('/post/:id', auth, adaptRoute(makeUpdatePostController()))
  router.delete('/post/:id', auth, adaptRoute(makeDeletePostController()))
}
