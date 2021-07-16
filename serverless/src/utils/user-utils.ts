import {MessageConstants} from '../constants/message-constants';
import {Response} from '../interfaces/response';
import User from './dynamo-utilities/user';
import RequestUtils from './request-utils';
import MessageUtil from './response-utils';
import {APIGatewayEvent, SQSEvent} from "aws-lambda";
import BcryptUtils from "./bcrypt-utils";

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

    public static async updateTwoFactorAuthentication(event: SQSEvent): Promise<string> {
        try {
            for (const record of event.Records) {
                const data = JSON.parse(record.body);

                const email = data.email;
                let tfa = data.twoFactorAuthentication;

                tfa.securityAnswerOne = await BcryptUtils.getHashedValue(tfa.securityAnswerOne);
                tfa.securityAnswerTwo = await BcryptUtils.getHashedValue(tfa.securityAnswerTwo);

                await User.updateTwoFactorAuthentication(email, tfa);
            }
        } catch (error) {
            console.log(error);
            return MessageConstants.INVALID_REQUEST;
        }
    }
}
