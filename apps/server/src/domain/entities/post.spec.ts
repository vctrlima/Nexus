import { faker } from '@faker-js/faker';
import { Post } from './post';
import { User } from './user';
import { Like } from './like';

describe('Post', () => {
  it('should create a new Post instance', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userPassword = faker.internet.password();
    const userName = faker.person.fullName();
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();
    const likeId = faker.string.uuid();

    const author = new User({
      id: userId,
      email: userEmail,
      password: userPassword,
      name: userName,
    });
    const postAux = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
      author,
    });
    const likes = [new Like({ id: likeId, user: author, post: postAux })];
    const post = new Post({
      id: postAux.id,
      title: postAux.title,
      content: postAux.content,
      published: true,
      author,
      likes,
    });

    expect(post.id).toBe(postId);
    expect(post.title).toBe(postTitle);
    expect(post.content).toBe(postContent);
    expect(post.published).toBe(true);
    expect(post.author).toStrictEqual(author);
    expect(post.likes).toStrictEqual(likes);
  });

  it('should have an undefined id when not provided', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userPassword = faker.internet.password();
    const userName = faker.person.fullName();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();

    const author = new User({
      id: userId,
      email: userEmail,
      password: userPassword,
      name: userName,
    });
    const post = new Post({
      id: undefined,
      title: postTitle,
      content: postContent,
      published: true,
      author,
    });

    expect(post.id).toBeUndefined();
    expect(post.title).toBe(postTitle);
    expect(post.content).toBe(postContent);
    expect(post.published).toBe(true);
    expect(post.author).toStrictEqual(author);
  });

  it('should have an undefined author when not provided', () => {
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();

    const post = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
    });

    expect(post.id).toBe(postId);
    expect(post.title).toBe(postTitle);
    expect(post.content).toBe(postContent);
    expect(post.published).toBe(true);
    expect(post.author).toBeUndefined();
  });
});
