import {APIGatewayEvent, Handler} from 'aws-lambda';
import AuthUtils from '../utils/auth-utils';

export const verifyToken: Handler = async (event) => {
    return await AuthUtils.verifyToken(event);
}

export const refreshToken: Handler = async (event: APIGatewayEvent) => {
    return await AuthUtils.refreshToken(event);
}

export const register: Handler = async (event: APIGatewayEvent) => {
    return await AuthUtils.register(event);
}

export const login: Handler = async (event: APIGatewayEvent) => {
    return await AuthUtils.login(event);
}
