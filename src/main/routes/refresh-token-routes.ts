import { adaptRoute } from '@/main/adapters'
import {
  makeHandleRefreshTokenController,
  makeRevokeRefreshTokenController,
} from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/refresh-token', adaptRoute(makeHandleRefreshTokenController()))
  router.post(
    '/refresh-token/revoke',
    adaptRoute(makeRevokeRefreshTokenController()),
  )
}
