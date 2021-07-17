import * as dynamoDB from 'dynamoose';
import { SQS } from 'aws-sdk';
import {RegisterRequest} from '../../interfaces/register-request';
import {WillowBankSchema} from '../../models/willow-bank';
import BcryptUtilities from '../bcrypt-utils';
import {SqsUtils} from "../sqs-utils";

const willowBankTable: any = dynamoDB.model('willowBank', WillowBankSchema);
const sqs: SQS = new SQS();

/**
 * Modifies DynamoDB Table
 */
export default class Auth {
    /**
     * Create User
     *
     * @param user
     * @return status
     */
    static async createUser(user: RegisterRequest): Promise<boolean> {
        return willowBankTable
            .create({
                email: user.email,
                password: await BcryptUtilities.getHashedValue(user.password),
                account: JSON.stringify({
                    balance: 10000,
                    transactions: {},
                    payees: {}
                }),
                etransfers: JSON.stringify({
                    transactions: {},
                    contacts: {},
                }),
                settings: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    country: user.country
                }),
                twoFactorAuthentication: '',
                twoFactorAuthenticationEnabled: false,
                acceptedTermsAndConditions: false,
                lastLogin: Date.now(),
                createdAt: Date.now(),
            })
            .then(async () => {
                console.log(sqs.getQueueUrl({QueueName: 'updateTwoFactorAuthenticationSQS'}));
                let sqsParams = SqsUtils.sqsParams();
                sqsParams.MessageBody = JSON.stringify({
                    'email': user.email,
                    twoFactorAuthentication: {
                        'securityQuestionOne': user.twoFactorAuthentication.securityQuestionOne,
                        'securityAnswerOne': user.twoFactorAuthentication.securityAnswerOne,
                        'securityQuestionTwo': user.twoFactorAuthentication.securityQuestionOne,
                        'securityAnswerTwo': user.twoFactorAuthentication.securityAnswerTwo,
                    }
                });
                await sqs.sendMessage(sqsParams).promise();
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    /**
     * Deletes User
     *
     * @param email
     * @return status
     */
    static willowBankTable(email: string): boolean {
        return willowBankTable
            .delete({email: email})
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }

    /**
     * Gets if the user already exists in the table
     *
     * @param email
     * @returns user id
     */
    static getUserExists(email: string): any {
        return willowBankTable
            .query('email')
            .eq(email)
            .attributes(['email'])
            .exec()
            .then((result: any) => {
                if (result.count === 1) {
                    return result[0];
                } else {
                    return undefined;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Gets User Data
     *
     * @param _email
     * @returns user id and key
     */
    static getUserData(email: string): any {
        return willowBankTable
            .query()
            .where('email')
            .eq(email)
            .attributes(['email', 'password', 'acceptedTermsAndConditions'])
            .exec()
            .then((result: any) => {
                return result[0];
            })
            .catch((error) => {
                console.log(error);
                return null;
            });
    }

    /**
     * Updates User's Last Login
     *
     * @param email
     * @return update auth status
     */
    static updateLastLogin(email: string): Promise<boolean> {
        return willowBankTable
            .update(
                {
                    email: email,
                },
                {
                    lastLogin: Date.now(),
                }
            )
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
    }
}
