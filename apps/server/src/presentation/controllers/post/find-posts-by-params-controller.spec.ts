import { faker } from '@faker-js/faker';
import { Post } from '@server/domain/entities';
import { FindPostsByParams } from '@server/domain/use-cases';
import { ok, serverError } from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { FindPostsByParamsController } from './find-posts-by-params-controller';

const findPostsByParamsMock = (): FindPostsByParams => ({
  findManyByParams: jest.fn(),
});

describe('FindPostsByParamsController', () => {
  let findPostsByParams: FindPostsByParams;
  let findPostsByParamsController: FindPostsByParamsController;

  beforeEach(() => {
    findPostsByParams = findPostsByParamsMock();
    findPostsByParamsController = new FindPostsByParamsController(
      findPostsByParams
    );
  });

  it('should find a post by id and return 200', async () => {
    const userId = faker.string.uuid();
    const params: FindPostsByParams.Params = {
      user: { id: userId },
      keywords: faker.lorem.words(),
      topics: [faker.lorem.word(), faker.lorem.word()],
      skip: 0,
      take: 20,
    };
    const post: Post[] = [
      {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        published: false,
        author: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          name: faker.person.fullName(),
        },
      },
    ];
    jest.spyOn(findPostsByParams, 'findManyByParams').mockResolvedValue(post);
    const request: HttpRequest = {
      query: { ...params, topics: params.topics.join(',') },
      user: { id: userId },
    };

    const response = await findPostsByParamsController.handle(request);

    expect(findPostsByParams.findManyByParams).toHaveBeenCalledWith(params);
    expect(response).toEqual(ok(post));
  });

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const params: FindPostsByParams.Params = {
      keywords: faker.lorem.words(),
      topics: [faker.lorem.word(), faker.lorem.word()],
      skip: 0,
      take: 20,
    };
    jest
      .spyOn(findPostsByParams, 'findManyByParams')
      .mockRejectedValue(new Error('Error finding posts'));
    const request: HttpRequest = {
      query: { ...params, topics: params.topics.join(',') },
    };

    const response = await findPostsByParamsController.handle(request);

    expect(findPostsByParams.findManyByParams).toHaveBeenCalledWith(params);
    expect(response).toEqual(serverError(new Error('Error finding posts')));
  });
});
