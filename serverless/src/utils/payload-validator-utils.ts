import assert from 'assert';
import * as validator from 'validator';
import * as uuid from 'uuid';
import {LoginRequest} from '../interfaces/login-request';
import {RegisterRequest} from '../interfaces/register-request';
import TypescriptUtils from './typescript-utils';

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
        assert(password.length > 6);
        assert(password.length < 64);
        return password;
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
        assert(TypescriptUtils.checkString(request.firstName));
        assert(TypescriptUtils.checkString(request.lastName));
        assert(TypescriptUtils.checkString(request.country));
        assert(TypescriptUtils.checkString(request.twoFactorAuthentication.securityQuestionOne));
        assert(TypescriptUtils.checkString(request.twoFactorAuthentication.securityAnswerOne));
        assert(TypescriptUtils.checkString(request.twoFactorAuthentication.securityQuestionTwo));
        assert(TypescriptUtils.checkString(request.twoFactorAuthentication.securityAnswerTwo));
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
}
