import { Post } from '@server/domain/entities';
import { FindPostById } from '@server/domain/use-cases';
import { ok, serverError } from '@server/presentation/helpers';
import { HttpRequest } from '@server/presentation/protocols';
import { faker } from '@faker-js/faker';
import { FindPostByIdController } from './find-post-by-id-controller';

const findPostByIdMock = (): FindPostById => ({
  findById: jest.fn(),
});

describe('FindPostByIdController', () => {
  let findPostById: FindPostById;
  let findPostByIdController: FindPostByIdController;

  beforeEach(() => {
    findPostById = findPostByIdMock();
    findPostByIdController = new FindPostByIdController(findPostById);
  });

  it('should find a post by id and return 200', async () => {
    const postId = faker.string.uuid();
    const foundPost: Post = {
      id: postId,
      title: faker.lorem.words(),
      content: faker.lorem.words(),
      published: false,
      author: {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
      },
    };
    jest.spyOn(findPostById, 'findById').mockResolvedValue(foundPost);
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
      user: { id: foundPost.author.id },
    };

    const response = await findPostByIdController.handle(request);

    expect(findPostById.findById).toHaveBeenCalledWith({
      id: postId,
      user: { id: foundPost.author.id },
    });
    expect(response).toEqual(ok(foundPost));
  });

  it('should return 500 Internal Server Error if an error occurs', async () => {
    const postId = faker.string.uuid();
    jest
      .spyOn(findPostById, 'findById')
      .mockRejectedValue(new Error('Error finding post'));
    const request: HttpRequest<{ id: string }> = {
      params: { id: postId },
    };

    const response = await findPostByIdController.handle(request);

    expect(findPostById.findById).toHaveBeenCalledWith({ id: postId });
    expect(response).toEqual(serverError(new Error('Error finding post')));
  });
});
