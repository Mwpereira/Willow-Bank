import {APIGatewayEvent} from 'aws-lambda';
import MessageUtil from './response-utils';
import PayloadValidatorUtils from './payload-validator-utils';
import RequestUtils from './request-utils';
import BcryptUtils from './bcrypt-utils';
import JwtUtils from './jwt-utils';
import CookieUtilities from './cookie-utils';
import Auth from './dynamo-utilities/auth';
import {RegisterRequest} from '../interfaces/register-request';
import {LoginRequest} from '../interfaces/login-request';
import {Response} from '../interfaces/response';
import {MessageConstants} from '../constants/message-constants';

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
            const user = JwtUtils.getDecodedToken(
                JwtUtils.getToken(CookieUtilities.getCookie(event.headers))
            );
            console.log(user)
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


