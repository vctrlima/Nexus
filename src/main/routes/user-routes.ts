import { adaptRoute } from '@/main/adapters'
import {
  makeAuthenticateUserController,
  makeCreateUserController,
  makeDeleteUserController,
  makeFindUserByIdController,
  makeUpdateUserController,
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/user', adaptRoute(makeCreateUserController()))
  router.get('/user/:id', auth, adaptRoute(makeFindUserByIdController()))
  router.put('/user/:id', auth, adaptRoute(makeUpdateUserController()))
  router.delete('/user/:id', auth, adaptRoute(makeDeleteUserController()))
  router.post('/login', adaptRoute(makeAuthenticateUserController()))
}
