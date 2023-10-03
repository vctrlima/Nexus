import {
  likeRoutes,
  postRoutes,
  refreshTokenRoutes,
  topicRoutes,
  userRoutes,
} from '@server/main/routes';
import { Router, type Express } from 'express';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  likeRoutes(router);
  postRoutes(router);
  refreshTokenRoutes(router);
  topicRoutes(router);
  userRoutes(router);
};
