import { adaptRoute } from '@/main/adapters'
import {
  makeHandleRefreshTokenController,
  makeRevokeRefreshTokenController,
} from '@/main/factories/controllers'
import { auth } from '@/main/middlewares/auth'
import { Router } from 'express'

export default (router: Router) => {
  router.post(
    '/refresh-token',
    auth,
    adaptRoute(makeHandleRefreshTokenController()),
  )
  router.post(
    '/refresh-token/revoke',
    auth,
    adaptRoute(makeRevokeRefreshTokenController()),
  )
}
