import { Post } from './post';

export class Topic {
  public id?: string;
  public readonly label: string;
  public readonly posts?: Post[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(params: {
    id?: string;
    label: string;
    posts?: Post[];
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = params.id;
    this.label = params.label;
    this.posts = params.posts;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }
}
