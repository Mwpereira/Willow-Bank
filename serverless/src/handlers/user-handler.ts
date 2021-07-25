import {APIGatewayEvent, Handler} from 'aws-lambda';
import UserUtils from '../utils/user-utils';

export const acceptedTermsAndConditions: Handler = async (event: APIGatewayEvent) => {
  return await UserUtils.acceptedTermsAndConditions(event);
}

export const getAccount: Handler = async (event: APIGatewayEvent) => {
  return await UserUtils.getAccount(event);
}

export const getSettings: Handler = async (event: APIGatewayEvent) => {
  return await UserUtils.getSettings(event);
}

export const updateSettings: Handler = async (event: APIGatewayEvent) => {
  return await UserUtils.updateSettings(event);
}

export const updatePayees: Handler = async (event: APIGatewayEvent) => {
  return await UserUtils.updatePayees(event);
}

export const payBill: Handler = async (event: APIGatewayEvent) => {
  return await UserUtils.payBill(event);
}

export const sendAdminTransaction: Handler = async (event: APIGatewayEvent) => {
  return await UserUtils.sendAdminTransaction(event);
}
