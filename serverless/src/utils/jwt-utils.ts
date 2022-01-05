import {PolicyDocument} from "aws-lambda";
import * as jwt from "jsonwebtoken";

/**
 * Helper methods for JWT
 */
export default class JwtUtils {
  /**
   * Generates JWT For Protected Routes
   *
   * @param userData
   * @param twoFactorAuthenticationEnabled
   * @param authorized
   * @return JWT
   */
  static async generateJwt(userData: any, twoFactorAuthenticationEnabled: boolean, authorized: boolean): Promise<string> {
    return jwt.sign(
      {
        sub: userData.email.toLowerCase(),
        twoFactorAuthentication: {
          enabled: twoFactorAuthenticationEnabled,
          authorized
        }
      },
      process.env.APP_SECRET
    );
  }

  /**
   * Refreshes JWT
   *
   * @param user
   * @return new JWT
   */
  static refreshJwt(user: any): Promise<string> {
    return new Promise((resolve) => { resolve(jwt.sign(
      {
        sub: user.sub.toLowerCase(),
      },
      process.env.APP_SECRET
    ))});
  }

  /**
   * Expires JWT For Protected Routes
   *
   * @return JWT
   */
  static expireJwt(): string {
    return jwt.sign(
      {},
      process.env.APP_SECRET
    );
  }

  /**
   * Retrieves Token
   *
   * @param cookie
   * @return access token
   */
  static getToken(cookie: string): string | null {
    const tokens = cookie.split(";");
    let accessToken: string = null;

    for (const token of tokens) {
      if (token.includes("accessToken")) {
        accessToken = token.trim().substr(12);
        break;
      }
    }

    return accessToken;
  }

  /**
   * Retrieves decoded token
   *
   * @param token
   * @return decoded token
   */
  static async getDecodedToken(token: string): Promise<string | object> {
    return new Promise((resolve) => {
      resolve(jwt.verify(token, process.env.APP_SECRET));
    });
  }

  /**
   * Verifies JWT
   *
   * @param token
   */
  static async verify(token: string): Promise<string | object> {
    return new Promise((resolve) => {
      resolve(jwt.verify(token, process.env.APP_SECRET));
    });
  }

  /**
   * Generates JWT Policy Response
   *
   * @param principalId
   * @param effect
   * @param methodArn
   * @return jwt response
   */
  static generatePolicyResponse(principalId, effect, methodArn): string | object {
    const policyDocument = this.generatePolicyDocument(effect, methodArn);

    return {
      principalId,
      policyDocument,
    };
  }

  /**
   * Generates Policy Document for JWT Response
   *
   * @param effect
   * @param methodArn
   * @return jwt policy document
   */
  private static generatePolicyDocument(effect, methodArn): PolicyDocument | null {
    if (!effect || !methodArn) {
      return null;
    }

    return {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: methodArn,
        },
      ],
    };
  }
}
