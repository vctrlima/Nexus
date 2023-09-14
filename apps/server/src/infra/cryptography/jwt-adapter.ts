import { Decrypter, Encrypter } from '@server/data/protocols/cryptography'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  async encrypt({
    plainText,
    secret,
    jti,
    expiresIn = '20m',
  }: Encrypter.Params): Promise<string> {
    let payload: any = { id: plainText }
    if (jti) payload = { ...payload, jti }
    return jwt.sign(payload, secret, { expiresIn })
  }

  async decrypt({ cipherText, secret }: Decrypter.Params): Promise<string> {
    return jwt.verify(cipherText, secret) as any
  }
}
