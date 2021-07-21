import * as bcrypt from 'bcryptjs';

/**
 * Contains methods for encrypting/hashing
 */
export default class BcryptUtils {
  /**
   * Generates string containing the hashed value - Salt Level 15 * Advanced Hashing
   *
   * @param secret
   * @returns hashed password
   */
  static async getHashedValue(secret: string): Promise<string> {
    return bcrypt.hash(secret, await bcrypt.genSalt(15));
  }

  /**
   * Confirms if password is valid
   *
   * @param actual password
   * @param expected password
   */
  static async validatePassword(
    actual: string,
    expected: string
  ): Promise<boolean> {
    return await bcrypt.compare(actual, expected);
  }
}
