import {
  postRoutes,
  refreshTokenRoutes,
  userRoutes,
} from '@server/main/routes';
import { Router, type Express } from 'express';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  postRoutes(router);
  refreshTokenRoutes(router);
  userRoutes(router);
};
