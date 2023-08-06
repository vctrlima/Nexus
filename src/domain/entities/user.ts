export class User {
  public id?: string
  public readonly email?: string
  public password?: string
  public readonly name?: string
  public readonly createdAt?: Date
  public readonly updatedAt?: Date

  constructor(id: string, email: string, password: string, name: string) {
    this.id = id
    this.email = email
    this.password = password
    this.name = name
  }
}
