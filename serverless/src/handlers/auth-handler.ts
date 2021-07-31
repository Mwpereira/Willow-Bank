import {APIGatewayEvent, Handler, SQSEvent} from 'aws-lambda';
import AuthController from '../controllers/auth-controller';

export const verifyToken: Handler = async (event) => {
  return await AuthController.verifyToken(event);
}

export const refreshToken: Handler = async (event: APIGatewayEvent) => {
  return await AuthController.refreshToken(event);
}

export const register: Handler = async (event: APIGatewayEvent) => {
  return await AuthController.register(event);
}

export const login: Handler = async (event: APIGatewayEvent) => {
  return await AuthController.login(event);
}

export const logout: Handler = async () => {
  return await AuthController.logout();
}

export const updateEmail: Handler = async (event: APIGatewayEvent) => {
  return await AuthController.updateEmail(event);
}

export const changePassword: Handler = async (event: APIGatewayEvent) => {
  return await AuthController.changePassword(event);
}

export const updateTwoFactorAuthentication: Handler = async (event: SQSEvent) => {
  return await AuthController.updateTwoFactorAuthentication(event);
}

export const updateTwoFactorAuthenticationEnabled: Handler = async (event: SQSEvent) => {
  return await AuthController.updateTwoFactorAuthenticationEnabled(event);
}

export const deleteUser: Handler = async (event: APIGatewayEvent) => {
  return await AuthController.deleteUser(event);
}

