import { adaptRoute } from '@server/main/adapters';
import {
  makeCreateTopicController,
  makeFindAllTopicsController,
} from '@server/main/factories/controllers';
import { auth } from '@server/main/middlewares/auth';
import { Router } from 'express';

export default (router: Router) => {
  router.post('/topic', auth, adaptRoute(makeCreateTopicController()));
  router.get('/topic', adaptRoute(makeFindAllTopicsController()));
};
