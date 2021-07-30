import {APIGatewayEvent} from 'aws-lambda';
import {MessageConstants} from '../constants/message-constants';
import {MessageAction} from '../enums/message-action';
import {TransactionActions} from '../enums/transaction-actions';
import {TransactionTypes} from '../enums/transaction-types';
import {Contact} from '../interfaces/contact';
import {Payee} from '../interfaces/payee';
import {Response} from '../interfaces/response';
import User from './dynamo-utilities/user';
import user from './dynamo-utilities/user';
import EtransferUtils from './etransfer-utils';
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

  public static async getEtransferData(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const etransfer = await User.getEtransferData(email);

      if (etransfer) {
        return MessageUtil.success(
          200,
          MessageConstants.SETTINGS_GET_SUCCESS,
          {etransfer}
        );
      }
      return MessageUtil.error(404, MessageConstants.SETTINGS_GET_FAILED);
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

  public static async updateContacts(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const etransfer = await User.getEtransferData(email);

      const data = RequestUtils.getRequest(event);
      const action = data.messageAction;

      delete data.messageAction;
      const contact: Contact = data;

      if (action === MessageAction.ADD) {
        etransfer.contacts[contact.name] = contact;
      } else {
        delete etransfer.contacts[contact.name];
      }

      if (await user.updateEtransferData(email, etransfer)) {
        return MessageUtil.success(
          200,
          action === MessageAction.ADD ? MessageConstants.CONTACT_ADDED_SUCCESS : MessageConstants.CONTACT_DELETED_SUCCESS,
          {etransfer}
        );
      }
      return MessageUtil.error(404, MessageConstants.CONTACTS_UPDATE_FAILED);
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

      const updatedAccount = TransactionUtils.generateTransaction(account, data.amount, data.action, TransactionTypes.BILL, data.receiver);

      if (await user.updateAccount(email, updatedAccount)) {
        return MessageUtil.success(
          200,
          'Test',
          {account: updatedAccount}
        );
      }
      return MessageUtil.error(404, MessageConstants.ADMIN_TRANSACTION_FAILED);
    } catch (error) {
      console.log(error);
      return MessageUtil.error(400, MessageConstants.INVALID_REQUEST);
    }
  }

  public static async sendEtransfer(event: APIGatewayEvent): Promise<Response> {
    try {
      const email = RequestUtils.getEmail(event);
      const data = RequestUtils.getRequest(event);
      const account = await User.getAccount(email);
      const etransfer = await User.getEtransferData(email);

      const updatedAccount = TransactionUtils.generateTransaction(account, data.amount, data.action, TransactionTypes.ETRANSFER, data.receiver);

      if (updatedAccount) {
        const updatedEtransfer = EtransferUtils.generateEtransfer(etransfer, data.amount, data.receiver);

        if (await user.updateAccount(email, updatedAccount) && await user.updateEtransferData(email, updatedEtransfer)) {
          return MessageUtil.success(
            200,
            'Test',
            {account: updatedAccount, etransfer: updatedEtransfer}
          );
        }
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

      const updatedAccount = TransactionUtils.generateTransaction(account, data.amount, data.action, TransactionTypes.ADMIN);

      if (await user.updateAccount(email, updatedAccount)) {
        return MessageUtil.success(
          200,
          data.action === TransactionActions.DEPOSIT ? MessageConstants.ADMIN_DEPOSIT_SUCCESS : MessageConstants.ADMIN_WITHDRAW_SUCCESS,
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
