import { faker } from '@faker-js/faker';
import { User } from '@server/domain/entities';
import { FindUserByToken } from '@server/domain/use-cases';
import { UnauthorizedError } from '@server/presentation/errors';
import { AuthMiddleware } from './auth-middleware';

class FindUserByTokenSpy implements FindUserByToken {
  accessToken!: string;
  result: User = new User({
    id: faker.string.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  async findUserByToken(accessToken: string): Promise<FindUserByToken.Model> {
    this.accessToken = accessToken;
    return this.result;
  }
}

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token',
});

type SutTypes = {
  sut: AuthMiddleware;
  findUserByTokenSpy: FindUserByTokenSpy;
};

const makeSut = (): SutTypes => {
  const findUserByTokenSpy = new FindUserByTokenSpy();
  const sut = new AuthMiddleware(findUserByTokenSpy);
  return {
    sut,
    findUserByTokenSpy,
  };
};

describe('AuthMiddleware', () => {
  it('should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle({});

    expect(httpResponse.statusCode).toBe(403);
    expect(httpResponse.body).toEqual(new Error('Access denied'));
  });

  it('should call FindUserByToken with correct accessToken', async () => {
    const { sut, findUserByTokenSpy: findUserByToken } = makeSut();
    const httpRequest = mockRequest();

    await sut.handle(httpRequest);

    expect(findUserByToken.accessToken).toBe(httpRequest.accessToken);
  });

  it('should return 403 if FindUserByToken returns null', async () => {
    const { sut, findUserByTokenSpy: findUserByToken } = makeSut();
    findUserByToken.result = null as any;

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse.statusCode).toBe(403);
    expect(httpResponse.body).toEqual(new Error('Access denied'));
  });

  it('should return 200 if FindUserByToken returns an user', async () => {
    const { sut, findUserByTokenSpy: findUserByToken } = makeSut();

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({ userId: findUserByToken.result.id });
  });

  it('should return 500 if FindUserByToken throws', async () => {
    const { sut, findUserByTokenSpy: findUserByToken } = makeSut();
    jest
      .spyOn(findUserByToken, 'findUserByToken')
      .mockRejectedValueOnce(new Error('User not found'));

    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError());
  });
});
