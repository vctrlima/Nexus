import { User } from './user'

export class Post {
  public readonly id?: string
  public readonly title: string
  public readonly content: string
  public readonly published: boolean
  public readonly author: User

  constructor(
    id: string,
    title: string,
    content: string,
    published: boolean,
    author: User,
  ) {
    this.id = id
    this.title = title
    this.content = content
    this.published = published
    this.author = new User(
      author.id,
      author.email,
      author.password,
      author.name,
    )
  }
}
