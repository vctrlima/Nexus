import { faker } from '@faker-js/faker'
import { User } from './user'

describe('User', () => {
  it('should create a new User instance', () => {
    const id = faker.string.uuid()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.person.fullName()

    const user = new User({
      id,
      email,
      password,
      name,
    })

    expect(user.id).toBe(id)
    expect(user.email).toBe(email)
    expect(user.password).toBe(password)
    expect(user.name).toBe(name)
  })

  it('should have an undefined id when not provided', () => {
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.person.fullName()

    const user = new User({ id: undefined, email, password, name })

    expect(user.id).toBeUndefined()
    expect(user.email).toBe(email)
    expect(user.password).toBe(password)
    expect(user.name).toBe(name)
  })

  it('should update the password', () => {
    const id = faker.string.uuid()
    const email = faker.internet.email()
    const password = faker.internet.password()
    const name = faker.person.fullName()

    const user = new User({ id, email, password, name })
    expect(user.password).toBe(password)
    const newPassword = faker.internet.password()
    user.password = newPassword

    expect(user.password).toBe(newPassword)
  })
})
