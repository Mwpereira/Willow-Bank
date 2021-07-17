import * as dynamoDB from 'dynamoose';
import {WillowBankSchema} from '../../models/willow-bank';
import {Account} from "../../interfaces/account";
import {Settings} from "../../interfaces/settings";
import {AccountData} from "../../interfaces/account-data";
import {SettingsData} from "../../interfaces/settings-data";

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

    public static getAccount(email: string): Promise<Account> | Promise<AccountData> {
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

    public static getSettings(email: string, responseData: boolean): Promise<Settings> | Promise<SettingsData> {
        return willowBankTable
            .query()
            .where('email')
            .eq(email)
            .attributes(['settings'])
            .exec()
            .then((result: any) => {
                const settings = JSON.parse(result[0].settings);
                return responseData ? {settings: JSON.parse(result[0].settings)} : settings;
            })
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    public static updateSettings(email: string, settings: Settings): Promise<SettingsData> {
        return willowBankTable
            .update({
                    email
                },
                {
                    settings: JSON.stringify(settings),
                })
            .then(() => {
                return true;
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
