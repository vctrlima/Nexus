import { HttpResponse } from '@server/presentation/protocols'

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
