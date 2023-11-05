import { adaptRoute } from '@server/main/adapters';
import {
  makeCreatePostController,
  makeDeletePostController,
  makeFindPostByIdController,
  makeFindPostsByParamsController,
  makeUpdatePostController,
} from '@server/main/factories/controllers';
import { auth } from '@server/main/middlewares/auth';
import { optionalAuth } from '@server/main/middlewares/optional-auth';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/post', auth, adaptRoute(makeCreatePostController()));
  router.get(
    '/post',
    optionalAuth,
    adaptRoute(makeFindPostsByParamsController())
  );
  router.get(
    '/post/:id',
    optionalAuth,
    adaptRoute(makeFindPostByIdController())
  );
  router.put('/post/:id', auth, adaptRoute(makeUpdatePostController()));
  router.delete('/post/:id', auth, adaptRoute(makeDeletePostController()));
};
