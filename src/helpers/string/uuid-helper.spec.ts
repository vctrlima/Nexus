import { uuidV4 } from './uuid-helper'

describe('uuidV4', () => {
  it('should return a string', () => {
    const uuid = uuidV4()

    expect(typeof uuid).toBe('string')
  })

  it('should return a string with 36 characters', () => {
    const uuid = uuidV4()

    expect(uuid.length).toBe(36)
  })

  it('should return a string with 4 dashes', () => {
    const uuid = uuidV4()

    expect(uuid.split('-').length).toBe(5)
  })

  it('should return a string with 8 characters in the first part', () => {
    const uuid = uuidV4()

    expect(uuid.split('-')[0].length).toBe(8)
  })

  it('should return a string with 4 characters in the second part', () => {
    const uuid = uuidV4()

    expect(uuid.split('-')[1].length).toBe(4)
  })

  it('should return a string with 4 characters in the third part', () => {
    const uuid = uuidV4()

    expect(uuid.split('-')[2].length).toBe(4)
  })

  it('should return a string with 4 characters in the fourth part', () => {
    const uuid = uuidV4()

    expect(uuid.split('-')[3].length).toBe(4)
  })

  it('should return a string with 12 characters in the fifth part', () => {
    const uuid = uuidV4()

    expect(uuid.split('-')[4].length).toBe(12)
  })
})
