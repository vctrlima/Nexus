import { Post } from './post';
import { Topic } from './topic';
import { User } from './user';

export class Like {
  public id?: string;
  public readonly user: Partial<User>;
  public readonly post: Partial<Post>;
  public readonly createdAt?: Date;

  constructor(params: {
    id?: string;
    user: User;
    post: Post;
    createdAt: Date;
  }) {
    this.id = params.id;
    this.user = new User({ ...params.user });
    this.post = new Post({
      ...params.post,
      author: new User({
        ...params.post.author,
        email: params.post.author.email,
        name: params.post.author.name,
        password: undefined,
      }),
      topics: params.post.topics
        ? params.post.topics.map(
            (topic) => new Topic({ ...topic, label: topic.label })
          )
        : undefined,
    });
    this.createdAt = params.createdAt;
  }
}
