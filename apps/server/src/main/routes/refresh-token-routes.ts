import { adaptRoute } from '@server/main/adapters';
import {
  makeHandleRefreshTokenController,
  makeRevokeRefreshTokenController,
} from '@server/main/factories/controllers';
import { auth } from '@server/main/middlewares/auth';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/refresh-token', adaptRoute(makeHandleRefreshTokenController()));
  router.post(
    '/refresh-token/revoke',
    auth,
    adaptRoute(makeRevokeRefreshTokenController())
  );
};
