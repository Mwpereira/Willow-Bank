import {APIGatewayEvent} from 'aws-lambda';
import {MessageConstants} from '../constants/message-constants';
import {LoginRequest} from '../interfaces/login-request';
import {RegisterRequest} from '../interfaces/register-request';
import {Response} from '../interfaces/response';
import BcryptUtils from './bcrypt-utils';
import CookieUtilities from './cookie-utils';
import Auth from './dynamo-utilities/auth';
import JwtUtils from './jwt-utils';
import PayloadValidatorUtils from './payload-validator-utils';
import RequestUtils from './request-utils';
import MessageUtil from './response-utils';

/**
 * Authentication methods + Lambda Authorizer
 */
export default class AuthUtilities {
    /**
     * Lambda Authorizer
     *
     * @param event
     */
    static async verifyToken(event: any): Promise<any> {
        try {
            const token: string = JwtUtils.getToken(
                CookieUtilities.getCookie(event.headers)
            );
            const methodArn = event.methodArn;

            if (!token) {
                return MessageUtil.error(404, MessageConstants.TOKEN_NOT_FOUND);
            }

            const decoded: any = JwtUtils.verify(token);

            if (decoded && decoded.sub) {
                return JwtUtils.generatePolicyResponse(
                    decoded.sub,
                    'Allow',
                    methodArn
                );
            } else {
                console.log('Deny: ' + decoded)
                return JwtUtils.generatePolicyResponse(
                    decoded.sub,
                    'Deny',
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
            const user: any = JwtUtils.getDecodedToken(
                JwtUtils.getToken(CookieUtilities.getCookie(event.headers))
            );
            const accessToken = JwtUtils.refreshJwt(user);

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
     * Lambda Authorizer
     *
     * @param event - APIGatewayEvent
     */
    static async register(event: APIGatewayEvent): Promise<Response> {
        try {
            // Get's user object from APIGatewayEvent
            const user: RegisterRequest = PayloadValidatorUtils.validateRegisterRequest(
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
     * Lambda Authorizer
     *
     * @param event - APIGatewayEvent
     */
    static async login(event: APIGatewayEvent): Promise<Response> {
        try {
            // Get's user object from APIGatewayEvent
            const user: LoginRequest = PayloadValidatorUtils.validateLoginRequest(
                RequestUtils.getRequest(event)
            );

            // Retrieves user data
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
                    const accessToken = await JwtUtils.generateJwt(userData);

                    if (await Auth.updateLastLogin(user.email)) {
                        return MessageUtil.successAuth(
                            302,
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
            return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
        }
    }

    /**
     *
     * Expires JWT token
     *
     */
    static async logout(): Promise<Response> {
        try {
            const accessToken = await JwtUtils.expireJwt();

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
}


