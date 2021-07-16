import * as dynamoDB from 'dynamoose';
import {WillowBankSchema} from '../../models/willow-bank';

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

    public static getAccount(_email: string): Promise<object> {
        return willowBankTable
            .query()
            .where('email')
            .eq(_email)
            .attributes(['account'])
            .exec()
            .then((result: any) => {
                const account = result[0].account;
                if (account === '') {
                    return { account: null };
                } else {
                    return { account: JSON.parse(account) };
                }
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    public static updateTwoFactorAuthentication(email: string, _data: object): Promise<boolean> {
        return willowBankTable
            .update({
                    email
                },
                {
                    twoFactorAuthentication: JSON.stringify(_data),
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
