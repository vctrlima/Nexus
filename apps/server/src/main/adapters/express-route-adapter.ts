import {
  type Controller,
  type HttpRequest,
} from '@server/presentation/protocols';
import { type Request, type RequestHandler, type Response } from 'express';

interface CustomRequest extends Request {
  userId?: any;
}

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: CustomRequest, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      user: { id: req.userId ?? null },
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
