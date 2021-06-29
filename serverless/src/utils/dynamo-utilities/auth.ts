import * as dynamoDB from 'dynamoose';
import BcryptUtilities from '../bcrypt-utils';
import {WillowBankSchema} from '../../models/willow-bank';
import {RegisterRequest} from '../../interfaces/register-request';

const willowBankTable: any = dynamoDB.model('willow-bank', WillowBankSchema);

/**
 * Modifies DynamoDB Table
 */
export default class Auth {
    /**
     * Create User Account
     *
     * @param _user
     * @return status
     */
    static async createUser(_user: RegisterRequest): Promise<boolean> {
        return willowBankTable
            .create({
                email: _user.email,
                password: await BcryptUtilities.getHashedValue(_user.password),
                accounts: '',
                etransfers: '',
                twoFactorAuthentication: JSON.stringify({
                    'securityQuestionOne': _user.twoFactorAuthentication.securityQuestionOne,
                    'securityAnswerOne': await BcryptUtilities.getHashedValue(_user.twoFactorAuthentication.securityAnswerOne),
                    'securityQuestionTwo': _user.twoFactorAuthentication.securityQuestionOne,
                    'securityAnswerTwo': await BcryptUtilities.getHashedValue(_user.twoFactorAuthentication.securityAnswerTwo),
                }),
                lastLogin: Date.now(),
                createdAt: Date.now(),
            })
            .then(() => {
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
     * @param _email
     * @return status
     */
    static willowBankTable(_email: string): boolean {
        return willowBankTable
            .delete({email: _email})
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
     * @param _email
     * @returns user id
     */
    static getUserExists(_email: string): any {
        return willowBankTable
            .query('email')
            .eq(_email)
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
    static getUserData(_email: string): any {
        return willowBankTable
            .query()
            .where('email')
            .eq(_email)
            .attributes(['email', 'password', 'lastLogin'])
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
     * @param _email
     * @return update auth status
     */
    static updateLastLogin(_email: string): Promise<boolean> {
        return willowBankTable
            .update(
                {
                    email: _email,
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
