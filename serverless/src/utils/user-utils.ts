import {APIGatewayEvent} from 'aws-lambda';
import {MessageConstants} from '../constants/message-constants';
import {MessageAction} from '../enums/message-action';
import {TransactionActions} from '../enums/transaction-actions';
import {Payee} from '../interfaces/payee';
import {Response} from '../interfaces/response';
import User from './dynamo-utilities/user';
import user from './dynamo-utilities/user';
import RequestUtils from './request-utils';
import MessageUtil from './response-utils';
import TransactionUtils from './transaction-utils';

/**
 * User Utilities
 */
export default class UserUtils {
  public static async acceptedTermsAndConditions(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const accepted = RequestUtils.getRequest(event).acceptedTermsAndConditions;

      if (await User.acceptedTermsAndConditions(email, accepted)) {
        return MessageUtil.success(200, MessageConstants.ACCEPTED_TERMS_AND_CONDITIONS, {
          acceptedTermsAndConditions: accepted
        });
      }
      return MessageUtil.error(400, MessageConstants.ACCEPT_TERMS_AND_CONDITIONS_FAIL);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  public static async getAccount(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const account = await User.getAccount(email);

      if (account) {
        return MessageUtil.success(
          200,
          MessageConstants.ACCOUNT_GET_SUCCESS,
          {account}
        );
      }
      return MessageUtil.error(404, MessageConstants.ACCOUNT_GET_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  public static async getSettings(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const settings = await User.getSettings(email);

      if (settings) {
        return MessageUtil.success(
          200,
          MessageConstants.SETTINGS_GET_SUCCESS,
          {settings}
        );
      }
      return MessageUtil.error(404, MessageConstants.SETTINGS_GET_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  public static async updateSettings(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const settings = await User.getSettings(email);
      settings.country = RequestUtils.getRequest(event).country;

      if (await user.updateSettings(email, settings)) {
        return MessageUtil.success(
          200,
          MessageConstants.SETTINGS_UPDATE_SUCCESS,
          {settings}
        );
      }
      return MessageUtil.error(404, MessageConstants.SETTINGS_UPDATE_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  public static async updatePayees(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const account = await User.getAccount(email);

      const data = RequestUtils.getRequest(event);
      const action = data.messageAction;

      delete data.messageAction;
      const payee: Payee = data;

      if (action === MessageAction.ADD) {
        account.payees[payee.name] = payee;
      } else {
        delete account.payees[payee.name];
      }

      if (await user.updateAccount(email, account)) {
        return MessageUtil.success(
          200,
          action === MessageAction.ADD ? MessageConstants.PAYEE_ADDED_SUCCESS : MessageConstants.PAYEE_DELETED_SUCCESS,
          {account}
        );
      }
      return MessageUtil.error(404, MessageConstants.PAYEES_UPDATE_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  public static async payBill(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const data = RequestUtils.getRequest(event);
      const account = await User.getAccount(email);

      const updatedAccount = TransactionUtils.generateTransaction(account, data.amount, data.action, data.receiver);

      if (await user.updateAccount(email, updatedAccount)) {
        return MessageUtil.success(
          200,
          'Test',
          {account}
        );
      }
      return MessageUtil.error(404, MessageConstants.ADMIN_TRANSACTION_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  public static async sendAdminTransaction(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const data = RequestUtils.getRequest(event);
      const account = await User.getAccount(email);

      const updatedAccount = TransactionUtils.generateTransaction(account, data.amount, data.action);

      if (await user.updateAccount(email, updatedAccount)) {
        return MessageUtil.success(
          200,
          data.transactionAction === TransactionActions.DEPOSIT ? MessageConstants.ADMIN_DEPOSIT_SUCCESS : MessageConstants.ADMIN_WITHDRAW_SUCCESS,
          {account}
        );
      }
      return MessageUtil.error(404, MessageConstants.ADMIN_TRANSACTION_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }
}
