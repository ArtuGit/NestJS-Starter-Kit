import { compare, hash } from 'bcrypt'

export class HashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 12)
  }

  public compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
