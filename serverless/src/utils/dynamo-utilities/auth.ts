import {SQS} from 'aws-sdk';
import * as dynamoDB from 'dynamoose';
import moment from 'moment';
import {RegisterRequest} from '../../interfaces/register-request';
import {WillowBankSchema} from '../../models/willow-bank';
import BcryptUtilities from '../bcrypt-utils';
import {SqsUtils} from '../sqs-utils';

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
        email: user.email.toLowerCase(),
        password: await BcryptUtilities.getHashedValue(user.password),
        account: JSON.stringify({
          balance: 10000,
          transactions: [{
            id: 1,
            receiver: 'Willow Bank',
            action: 'Admin',
            type: 'Deposit',
            amount: '10,000',
            date: moment().format('MMMM Do YYYY, h:mm:ss a')
          }],
          payees: {}
        }),
        etransfer: JSON.stringify({
          contacts: {},
          transactions: []
        }),
        settings: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country
        }),
        twoFactorAuthentication: '',
        twoFactorAuthenticationEnabled: false,
        acceptedTermsAndConditions: false,
        lastLogin: moment().format('MMMM Do YYYY, h:mm:ss a'),
        createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
      })
      .then(async () => {
        const sqsParams = SqsUtils.sqsParams();
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
  static deleteUser(email: string): boolean {
    return willowBankTable
      .delete({email})
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  /**
   * Gets the user data
   *
   * @param email
   * @returns user
   */
  static getUser(email: string): any {
    return willowBankTable
      .query('email')
      .eq(email.toLowerCase())
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
   * Gets if the user already exists in the table
   *
   * @param email
   * @returns user id
   */
  static getUserExists(email: string): any {
    return willowBankTable
      .query('email')
      .eq(email.toLowerCase())
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
   * @param email
   * @returns user id and key
   */
  static getUserData(email: string): any {
    return willowBankTable
      .query()
      .where('email')
      .eq(email.toLowerCase())
      .attributes(['email', 'password', 'acceptedTermsAndConditions', 'lastLogin', 'twoFactorAuthenticationEnabled'])
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
   * Create Existing User
   *
   * @param user
   * @return status
   */
  static async createExistingUser(user: any): Promise<boolean> {
    return willowBankTable
      .create({
        email: user.email.toLowerCase(),
        password: user.password,
        account: user.account,
        etransfer: user.etransfer,
        settings: user.settings,
        twoFactorAuthentication: user.twoFactorAuthentication,
        twoFactorAuthenticationEnabled: user.twoFactorAuthenticationEnabled,
        acceptedTermsAndConditions: user.acceptedTermsAndConditions,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      })
      .then(async () => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  /**
   * Updates User's Password
   *
   * @param email
   * @param password
   * @return update auth status
   */
  static async changePassword(email, password: string): Promise<boolean> {
    return willowBankTable
      .update(
        {
          email: email.toLowerCase(),
        },
        {
          password: await BcryptUtilities.getHashedValue(password),
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
          email: email.toLowerCase(),
        },
        {
          lastLogin: moment().format('MMMM Do YYYY, h:mm:ss a'),
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
