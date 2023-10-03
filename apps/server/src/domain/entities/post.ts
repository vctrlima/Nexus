import { Topic } from './topic';
import { User } from './user';

export class Post {
  public id?: string;
  public readonly title: string;
  public readonly content: string;
  public readonly published: boolean;
  public readonly author?: Partial<User>;
  public readonly topics?: Partial<Topic>[];
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(params: {
    id?: string;
    title: string;
    content: string;
    published: boolean;
    author?: User;
    topics?: Topic[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.title = params.title;
    this.content = params.content;
    this.published = params.published;
    this.author = params.author ? new User({ ...params.author }) : undefined;
    this.topics = params.topics
      ? params.topics.map((topic) => new Topic({ ...topic }))
      : undefined;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
