import assert from "assert";
import * as uuid from "uuid";
import * as validator from "validator";
import {LoginRequest} from "../interfaces/login-request";
import {RegisterRequest} from "../interfaces/register-request";
import TypescriptUtils from "./typescript-utils";

/**
 * Validates Payloads
 */
export default class PayloadValidatorUtils {
  /**
   * Validates Id
   */
  static validateId(id: any): string {
    assert(uuid.validate(id));
    return id;
  }

  /**
   * Validates User
   *
   * @param user
   * @return user
   */
  static validateUser(user: LoginRequest): LoginRequest {
    this.validateEmail(user.email);
    this.validatePassword(user.password)
    return user;
  }

  /**
   * Validates Email
   *
   * @param email
   * @return password
   */
  static validateEmail(email: string): string {
    assert(validator.isEmail(email));
    assert(email.length <= 128);
    return email;
  }

  /**
   * Validates Password
   *
   * @param password
   * @return password
   */
  static validatePassword(password: string): string {
    assert(TypescriptUtils.checkString(password));
    assert(password.length <= 128 && password.length > 6);
    return password;
  }

  /**
   * Validates Expected 64 Char String
   *
   * @param str
   * @return str
   */
  static validate64CharString(str: string): string {
    assert(TypescriptUtils.checkString(str));
    assert(this.validLength(str));
    return str;
  }

  /**
   * Validates Expected 64 Char String With No Min Value
   *
   * @param str
   * @return name
   */
  static validate64CharNoMinValueString(str: string): string {
    assert(TypescriptUtils.checkString(str));
    assert(str.length > 0 && str.length <= 64);
    return str;
  }

  /**
   * Validates Register Request
   *
   * @return request
   * @param request
   */
  static validateRegisterRequest(request: RegisterRequest): RegisterRequest {
    this.validateEmail(request.email);
    this.validatePassword(request.password);
    this.validate64CharNoMinValueString(request.firstName);
    this.validate64CharNoMinValueString(request.lastName);
    this.validate64CharNoMinValueString(request.country);
    this.validate64CharString(request.twoFactorAuthentication.securityQuestionOne);
    this.validate64CharNoMinValueString(request.twoFactorAuthentication.securityAnswerOne);
    this.validate64CharString(request.twoFactorAuthentication.securityQuestionTwo);
    this.validate64CharNoMinValueString(request.twoFactorAuthentication.securityAnswerTwo);
    return request;
  }

  /**
   * Validates Login Request
   *
   * @return request
   * @param request
   */
  static validateLoginRequest(request: LoginRequest): LoginRequest {
    this.validateEmail(request.email);
    this.validatePassword(request.password);
    return request;
  }

  /**
   * Checks Length of String
   *
   * @param str
   * @return name
   */
  private static validLength(str: string): string {
    assert(str.length > 6);
    assert(str.length <= 64);
    return str;
  }
}
