import { adaptMiddleware } from '@server/main/adapters';
import { makeOptionalAuthMiddleware } from '@server/main/factories/middlewares';

export const optionalAuth = adaptMiddleware(makeOptionalAuthMiddleware());
