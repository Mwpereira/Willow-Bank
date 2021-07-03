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
                    email: email
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
                    return { accounts: null };
                } else {
                    return { accounts: JSON.parse(account) };
                }
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }
}
