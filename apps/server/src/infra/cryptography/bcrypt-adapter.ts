import { HashComparer, Hasher } from '@server/data/protocols/cryptography'

import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt)
  }

  async compare(plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }
}
