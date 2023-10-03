import { faker } from '@faker-js/faker';
import { Like } from './like';
import { Post } from './post';
import { Topic } from './topic';
import { User } from './user';

describe('Like', () => {
  it('should create a new Like instance', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userName = faker.person.fullName();
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();
    const user = new User({
      id: userId,
      email: userEmail,
      password: undefined,
      name: userName,
    });
    const post = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
      author: user,
    });
    const likeId = faker.string.uuid();
    const likeCreatedAt = new Date();

    const like = new Like({
      id: likeId,
      user,
      post,
      createdAt: likeCreatedAt,
    });

    expect(like.id).toBe(likeId);
    expect(like.post).toStrictEqual(post);
    expect(like.user).toStrictEqual(user);
    expect(like.createdAt).toBe(likeCreatedAt);
  });

  it('should have an undefined id when not provided', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userName = faker.person.fullName();
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();
    const user = new User({
      id: userId,
      email: userEmail,
      password: undefined,
      name: userName,
    });
    const post = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
      author: user,
      topics: [],
    });
    const likeCreatedAt = new Date();

    const like = new Like({
      id: undefined,
      user,
      post,
      createdAt: likeCreatedAt,
    });

    expect(like.id).toBeUndefined();
    expect(like.post).toStrictEqual(post);
    expect(like.user).toStrictEqual(user);
    expect(like.createdAt).toBe(likeCreatedAt);
  });

  it('should have an undefined id when not provided', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userName = faker.person.fullName();
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();
    const topic = {
      id: faker.string.uuid(),
      label: faker.lorem.word(),
      posts: [],
      createdAt: new Date(),
    };
    const user = new User({
      id: userId,
      email: userEmail,
      password: undefined,
      name: userName,
    });
    const post = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
      author: user,
      topics: [new Topic({ ...topic })],
    });
    const likeCreatedAt = new Date();

    const like = new Like({
      id: undefined,
      user,
      post,
      createdAt: likeCreatedAt,
    });

    expect(like.id).toBeUndefined();
    expect(like.post).toStrictEqual(post);
    expect(like.user).toStrictEqual(user);
    expect(like.createdAt).toBe(likeCreatedAt);
  });

  it('should have an undefined post topics when not provided', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userName = faker.person.fullName();
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();
    const user = new User({
      id: userId,
      email: userEmail,
      password: undefined,
      name: userName,
    });
    const post = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
      author: user,
      topics: undefined,
    });
    const likeId = faker.string.uuid();
    const likeCreatedAt = new Date();

    const like = new Like({
      id: likeId,
      user,
      post,
      createdAt: likeCreatedAt,
    });

    expect(like.id).toBe(likeId);
    expect(like.post).toStrictEqual(post);
    expect(like.post.topics).toBeUndefined();
    expect(like.user).toStrictEqual(user);
    expect(like.createdAt).toBe(likeCreatedAt);
  });
});
