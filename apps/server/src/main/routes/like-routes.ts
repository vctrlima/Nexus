import { adaptRoute } from '@server/main/adapters';
import {
  makeCreateLikeController,
  makeDeleteLikeController,
} from '@server/main/factories/controllers';
import { auth } from '@server/main/middlewares/auth';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/like', auth, adaptRoute(makeCreateLikeController()));
  router.delete('/like/:id', auth, adaptRoute(makeDeleteLikeController()));
};
