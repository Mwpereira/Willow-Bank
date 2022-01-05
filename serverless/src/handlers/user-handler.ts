import {APIGatewayEvent, Handler} from "aws-lambda";
import UserController from "../controllers/user-controller";

export const acceptedTermsAndConditions: Handler = async (event: APIGatewayEvent) => {
  return await UserController.acceptedTermsAndConditions(event);
}

export const getAccount: Handler = async (event: APIGatewayEvent) => {
  return await UserController.getAccount(event);
}

export const getSettings: Handler = async (event: APIGatewayEvent) => {
  return await UserController.getSettings(event);
}

export const getEtransferData: Handler = async (event: APIGatewayEvent) => {
  return await UserController.getEtransferData(event);
}

export const updateSettings: Handler = async (event: APIGatewayEvent) => {
  return await UserController.updateSettings(event);
}

export const updatePayees: Handler = async (event: APIGatewayEvent) => {
  return await UserController.updatePayees(event);
}

export const updateContacts: Handler = async (event: APIGatewayEvent) => {
  return await UserController.updateContacts(event);
}

export const payBill: Handler = async (event: APIGatewayEvent) => {
  return await UserController.payBill(event);
}

export const sendEtransfer: Handler = async (event: APIGatewayEvent) => {
  return await UserController.sendEtransfer(event);
}

export const sendAdminTransaction: Handler = async (event: APIGatewayEvent) => {
  return await UserController.sendAdminTransaction(event);
}
