import { adaptRoute } from '@server/main/adapters'
import {
  makeAuthenticateUserController,
  makeCreateUserController,
  makeDeleteUserController,
  makeFindUserByIdController,
  makeUpdateUserController,
} from '@server/main/factories/controllers'
import { auth } from '@server/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/user', adaptRoute(makeCreateUserController()))
  router.get('/user/:id', auth, adaptRoute(makeFindUserByIdController()))
  router.put('/user/:id', auth, adaptRoute(makeUpdateUserController()))
  router.delete('/user/:id', auth, adaptRoute(makeDeleteUserController()))
  router.post('/login', adaptRoute(makeAuthenticateUserController()))
}
