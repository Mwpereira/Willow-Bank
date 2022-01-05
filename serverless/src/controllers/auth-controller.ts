import {APIGatewayEvent, SQSEvent} from "aws-lambda";
import {MessageConstants} from "../constants/message-constants";
import {Response} from "../interfaces/response";
import BcryptUtils from "../utils/bcrypt-utils";
import CookieUtilities from "../utils/cookie-utils";
import Auth from "../utils/dynamo-utilities/auth";
import user from "../utils/dynamo-utilities/user";
import User from "../utils/dynamo-utilities/user";
import JwtUtils from "../utils/jwt-utils";
import PayloadValidatorUtils from "../utils/payload-validator-utils";
import RequestUtils from "../utils/request-utils";
import MessageUtil from "../utils/response-utils";

/**
 * Authentication methods + Lambda Authorizer
 */
export default class AuthController {
  /**
   * Lambda Authorizer
   *
   * @param event
   */
  static async verifyToken(event: any): Promise<any> {
    try {
      const token = JwtUtils.getToken(
        CookieUtilities.getCookie(event.headers)
      );
      const methodArn = event.methodArn;

      if (!token) {
        return MessageUtil.error(404, MessageConstants.TOKEN_NOT_FOUND);
      }

      const decoded: any = await JwtUtils.verify(token);

      if (decoded && decoded.sub) {
        return JwtUtils.generatePolicyResponse(
          decoded.sub,
          "Allow",
          methodArn
        );
      } else {
        console.log("Deny: " + decoded)
        return JwtUtils.generatePolicyResponse(
          decoded.sub,
          "Deny",
          methodArn
        );
      }
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_TOKEN);
    }
  }

  /**
   * Lambda Authorizer
   *
   * @param event - APIGatewayEvent
   */
  static async refreshToken(event: APIGatewayEvent): Promise<Response> {
    try {
      const user = await JwtUtils.getDecodedToken(
        JwtUtils.getToken(CookieUtilities.getCookie(event.headers))
      );
      const accessToken = await JwtUtils.refreshJwt(user);

      return MessageUtil.successAuth(
        200,
        MessageConstants.VALID_TOKEN,
        accessToken,
        true
      );
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  /**
   * Updates User's Email
   *
   * @param event - APIGatewayEvent
   */
  static async updateEmail(event: APIGatewayEvent): Promise<Response> {
    try {
      const currentEmail = RequestUtils.getEmail(event);
      const newEmail = RequestUtils.getRequest(event).newEmail;

      const userData = await Auth.getUser(currentEmail);
      userData.email = newEmail;

      if (!(await Auth.getUserExists(newEmail))) {
        await Auth.deleteUser(currentEmail);
        if (await Auth.createExistingUser(userData)) {
          const accessToken = await JwtUtils.generateJwt(userData, false, true);
          return MessageUtil.successAuth(200, MessageConstants.EMAIL_UPDATED_SUCCESS, accessToken, true, {newEmail});
        } else {
          return MessageUtil.error(500, MessageConstants.DATABASE_ERROR);
        }
      } else {
        return MessageUtil.error(409, MessageConstants.EMAIL_TAKEN);
      }
    } catch (error) {
      console.log(error)
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  /**
   * Changes User's Password
   *
   * @param event - APIGatewayEvent
   */
  static async changePassword(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const userData = await Auth.getUserData(
        email
      );
      const currentPassword = RequestUtils.getRequest(event).currentPassword;
      const newPassword = RequestUtils.getRequest(event).newPassword;

      if (
        await BcryptUtils.validatePassword(
          currentPassword,
          userData.password
        )
      ) {
        if (await Auth.changePassword(email, newPassword)) {
          return MessageUtil.success(200, MessageConstants.PASSWORD_CHANGED_SUCCESS);
        }
      } else {
        return MessageUtil.error(404, MessageConstants.INVALID_CREDENTIALS);
      }
      return MessageUtil.error(409, MessageConstants.PASSWORD_CHANGED_FAILED);
    } catch (error) {
      console.log(error)
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  /**
   * Registers User
   *
   * @param event - APIGatewayEvent
   */
  static async register(event: APIGatewayEvent): Promise<Response> {
    try {
      const user = PayloadValidatorUtils.validateRegisterRequest(
        RequestUtils.getRequest(event)
      );

      if (!(await Auth.getUserExists(user.email))) {
        if (await Auth.createUser(user)) {
          return MessageUtil.success(201, MessageConstants.USER_CREATED);
        } else {
          return MessageUtil.error(500, MessageConstants.DATABASE_ERROR);
        }
      } else {
        return MessageUtil.error(409, MessageConstants.EMAIL_TAKEN);
      }
    } catch (error) {
      console.log(error)
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  /**
   * Authorizes User
   *
   * @param event - APIGatewayEvent
   */
  static async login(event: APIGatewayEvent): Promise<Response> {
    try {
      const user = PayloadValidatorUtils.validateLoginRequest(
        RequestUtils.getRequest(event)
      );

      const userData = await Auth.getUserData(
        user.email
      );

      if (userData) {
        if (
          await BcryptUtils.validatePassword(
            user.password,
            userData.password
          )
        ) {
          delete userData.password
          delete userData.twoFactorAuthentication
          const accessToken = await JwtUtils.generateJwt(userData, false, true);

          if (await Auth.updateLastLogin(user.email)) {
            return MessageUtil.successAuth(
              200,
              MessageConstants.USER_AUTHORIZED,
              accessToken,
              false,
              userData
            );
          } else {
            return MessageUtil.error(500, MessageConstants.DATABASE_ERROR);
          }
        } else {
          return MessageUtil.error(404, MessageConstants.INVALID_CREDENTIALS);
        }
      } else {
        return MessageUtil.error(404, MessageConstants.INVALID_CREDENTIALS);
      }
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_CREDENTIALS);
    }
  }

  /**
   *
   * Expires JWT token
   *
   */
  static async logout(): Promise<Response> {
    try {
      const accessToken = JwtUtils.expireJwt();

      return MessageUtil.successAuth(
        200,
        MessageConstants.EXPIRED_TOKEN,
        accessToken,
        false
      );
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  /**
   * Updates TFA for User
   *
   * @param event - SQSEvent
   */
  public static async updateTwoFactorAuthentication(event: SQSEvent): Promise<string> {
    try {
      for (const record of event.Records) {
        const data = JSON.parse(record.body);

        const email = data.email;
        const tfa = data.twoFactorAuthentication;

        tfa.securityAnswerOne = await BcryptUtils.getHashedValue(tfa.securityAnswerOne);
        tfa.securityAnswerTwo = await BcryptUtils.getHashedValue(tfa.securityAnswerTwo);

        await User.updateTwoFactorAuthentication(email, tfa);

        return MessageConstants.TFA_UPDATED_SUCCESS;
      }
    } catch (error) {
      console.log(error);
      return MessageConstants.INVALID_REQUEST;
    }
  }

  /**
   * Updates TFA for User
   *
   * @param event - SQSEvent
   */
  public static async updateTwoFactorAuthenticationEnabled(event: SQSEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const enabled = RequestUtils.getRequest(event).twoFactorAuthenticationEnabled;

      if (await user.updateTwoFactorAuthenticationEnabled(email, enabled)) {
        return MessageUtil.success(
          200,
          MessageConstants.TFA_ENABLED_UPDATE_SUCCESS,
          {twoFactorAuthenticationEnabled: enabled}
        );
      }
      return MessageUtil.error(404, MessageConstants.TFA_ENABLED_UPDATE_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  /**
   * Deletes User
   *
   * @param event - APIGatewayEvent
   */
  public static async deleteUser(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);

      if (await Auth.deleteUser(email)) {
        return MessageUtil.success(
          200,
          "DELETE USER",
        );
      }
      return MessageUtil.error(404, MessageConstants.ACCOUNT_GET_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }
}


