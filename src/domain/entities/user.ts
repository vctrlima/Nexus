import { Post } from './post'

export class User {
  public id?: string
  public readonly email: string
  public password: string
  public readonly name: string
  public readonly posts?: Post[]
  public readonly createdAt?: Date
  public readonly updatedAt?: Date

  constructor(params: {
    id?: string
    email: string
    name: string
    password: string
    posts?: Post[]
    createdAt?: Date
    updatedAt?: Date
  }) {
    this.id = params.id
    this.email = params.email
    this.password = params.password
    this.name = params.name
    this.posts = params.posts
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }
}
