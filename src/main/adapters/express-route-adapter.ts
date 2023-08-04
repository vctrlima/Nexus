import { type Controller, type HttpRequest } from '@/presentation/protocols'
import { type Request, type RequestHandler, type Response } from 'express'

interface CustomRequest extends Request {
  decoded: any
}

export const adaptRoute = (controller: Controller): RequestHandler => {
  return async (req: CustomRequest, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      user: req.decoded ?? null,
      params: req.params,
      query: req.query,
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      })
    }
  }
}
