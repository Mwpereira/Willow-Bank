import * as dynamoDB from 'dynamoose';
import {WillowBankSchema} from '../../models/willow-bank';
import {Account} from "../../interfaces/account";

const willowBankTable: any = dynamoDB.model('willowBank', WillowBankSchema);

/**
 * Modifies DynamoDB Table
 */
export default class User {
    public static acceptedTermsAndConditions(email: string): Promise<boolean> {
        return willowBankTable
            .update({
                    email
                },
                {
                    acceptedTermsAndConditions: true,
                })
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    public static getAccount(email: string): Promise<Account> {
        return willowBankTable
            .query()
            .where('email')
            .eq(email)
            .attributes(['account'])
            .exec()
            .then((result: any) => {
                return {account: JSON.parse(result[0].account)};
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    public static updateTwoFactorAuthentication(email: string, data: object): Promise<boolean> {
        return willowBankTable
            .update({
                    email
                },
                {
                    twoFactorAuthentication: JSON.stringify(data),
                })
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    public static updateAccount(email: string, data: object): Promise<boolean> {
        return willowBankTable
            .update({
                    email
                },
                {
                    account: JSON.stringify(data),
                })
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
}
