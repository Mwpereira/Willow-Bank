import {MessageConstants} from '../constants/message-constants';
import {Response} from '../interfaces/response';
import User from './dynamo-utilities/user';
import RequestUtils from './request-utils';
import MessageUtil from './response-utils';

/**
 * User Utilities
 */
export default class UserUtils {
    public static async acceptedTermsAndConditions(event: any): Promise<Response> {
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
    public static async getAccount(event: any): Promise<Response> {
        try {
            const email = RequestUtils.getEmail(event);
            const account = await User.getAccount(email);

            if (account !== undefined) {
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
}
