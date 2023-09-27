export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<T = any> {
  body?: T;
  user?: { id: string };
  params?: any;
  query?: any;
}
