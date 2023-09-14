import { HttpResponse } from '@server/presentation/protocols'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
