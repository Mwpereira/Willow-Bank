import {APIGatewayEvent, Handler, SQSEvent} from 'aws-lambda';
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

export const logout: Handler = async () => {
  return await AuthUtils.logout();
}

export const updateEmail: Handler = async (event: APIGatewayEvent) => {
  return await AuthUtils.updateEmail(event);
}

export const changePassword: Handler = async (event: APIGatewayEvent) => {
  return await AuthUtils.changePassword(event);
}

export const updateTwoFactorAuthentication: Handler = async (event: SQSEvent) => {
  return await AuthUtils.updateTwoFactorAuthentication(event);
}

export const updateTwoFactorAuthenticationEnabled: Handler = async (event: SQSEvent) => {
  return await AuthUtils.updateTwoFactorAuthenticationEnabled(event);
}

