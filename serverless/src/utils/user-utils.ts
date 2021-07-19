import {APIGatewayEvent} from 'aws-lambda';
import * as uuid from 'uuid';
import {MessageConstants} from '../constants/message-constants';
import {Account} from '../interfaces/account';
import {Payee} from '../interfaces/payee';
import {Response} from '../interfaces/response';
import User from './dynamo-utilities/user';
import user from './dynamo-utilities/user';
import RequestUtils from './request-utils';
import MessageUtil from './response-utils';

/**
 * User Utilities
 */
export default class UserUtils {
  public static async acceptedTermsAndConditions(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      if (await User.acceptedTermsAndConditions(email)) {
        return MessageUtil.success(200, MessageConstants.ACCEPTED_TERMS_AND_CONDITIONS, {
          acceptedTermsAndConditions: true
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
          account
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
      const settings = await User.getSettings(email, true);

      if (settings) {
        return MessageUtil.success(
          200,
          MessageConstants.SETTINGS_GET_SUCCESS,
          settings
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
      const settings = await User.getSettings(email, false);
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
      const account: Account = await User.getAccount(email);

      const data = RequestUtils.getRequest(event);
      const action = data.messageAction;
      const payee: Payee = data.payee;

      if (action === 'ADD') {
        payee.id = uuid.v4();
        account.payees[payee.id] = payee;
      } else {
        delete account.payees[payee.id];
      }

      if (await user.updateAccount(email, account)) {
        return MessageUtil.success(
          200,
          action === 'ADD' ? MessageConstants.PAYEE_ADDED_SUCCESS : MessageConstants.PAYEE_DELETED_SUCCESS,
          account
        );
      }
      return MessageUtil.error(404, MessageConstants.PAYEES_UPDATE_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }
}
