import { faker } from '@faker-js/faker';
import { Post } from './post';
import { Topic } from './topic';
import { User } from './user';

describe('Topic', () => {
  it('should create a new Topic instance', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userPassword = faker.internet.password();
    const userName = faker.person.fullName();
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();
    const topicId = faker.string.uuid();
    const topicLabel = faker.lorem.word();

    const author = new User({
      id: userId,
      email: userEmail,
      password: userPassword,
      name: userName,
    });
    const post = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
      author,
    });
    const topic = new Topic({ id: topicId, label: topicLabel, posts: [post] });

    expect(topic.id).toBe(topicId);
    expect(topic.label).toBe(topicLabel);
    expect(topic.posts).toStrictEqual([post]);
  });

  it('should have an undefined id when not provided', () => {
    const userId = faker.string.uuid();
    const userEmail = faker.internet.email();
    const userPassword = faker.internet.password();
    const userName = faker.person.fullName();
    const postId = faker.string.uuid();
    const postTitle = faker.lorem.words();
    const postContent = faker.lorem.words();
    const topicLabel = faker.lorem.word();

    const author = new User({
      id: userId,
      email: userEmail,
      password: userPassword,
      name: userName,
    });
    const post = new Post({
      id: postId,
      title: postTitle,
      content: postContent,
      published: true,
      author,
    });
    const topic = new Topic({ label: topicLabel, posts: [post] });

    expect(topic.id).toBeUndefined();
    expect(topic.label).toBe(topicLabel);
    expect(topic.posts).toStrictEqual([post]);
  });
});
