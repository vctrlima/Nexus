import { faker } from '@faker-js/faker'
import { Post } from './post'
import { User } from './user'

describe('Post', () => {
  it('should create a new Post instance', () => {
    const userId = faker.string.uuid()
    const userEmail = faker.internet.email()
    const userPassword = faker.internet.password()
    const userName = faker.person.fullName()
    const postId = faker.string.uuid()
    const postTitle = faker.lorem.words()
    const postContent = faker.lorem.words()

    const author = new User(userId, userEmail, userPassword, userName)
    const post = new Post(postId, postTitle, postContent, true, author)

    expect(post.id).toBe(postId)
    expect(post.title).toBe(postTitle)
    expect(post.content).toBe(postContent)
    expect(post.published).toBe(true)
    expect(post.author).toStrictEqual(author)
  })

  it('should have an undefined id when not provided', () => {
    const userId = faker.string.uuid()
    const userEmail = faker.internet.email()
    const userPassword = faker.internet.password()
    const userName = faker.person.fullName()
    const postTitle = faker.lorem.words()
    const postContent = faker.lorem.words()

    const author = new User(userId, userEmail, userPassword, userName)
    const post = new Post(undefined, postTitle, postContent, true, author)

    expect(post.id).toBeUndefined()
    expect(post.title).toBe(postTitle)
    expect(post.content).toBe(postContent)
    expect(post.published).toBe(true)
    expect(post.author).toStrictEqual(author)
  })
})
