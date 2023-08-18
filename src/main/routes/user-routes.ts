import { adaptRoute } from '@/main/adapters'
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeFindUserByIdController,
  makeUpdateUserController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/user', adaptRoute(makeCreateUserController()))
  router.get('/user/:id', adaptRoute(makeFindUserByIdController()))
  router.put('/user/:id', adaptRoute(makeUpdateUserController()))
  router.delete('/user/:id', adaptRoute(makeDeleteUserController()))
}
