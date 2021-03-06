import * as dynamoDB from "dynamoose";
import {Account} from "../../interfaces/account";
import {Etransfer} from "../../interfaces/etransfer";
import {Settings} from "../../interfaces/settings";
import {WillowBankSchema} from "../../models/willow-bank";

const willowBankTable: any = dynamoDB.model("willowBank", WillowBankSchema);

/**
 * Modifies DynamoDB Table
 */
export default class User {
  public static acceptedTermsAndConditions(email: string, accepted: boolean): Promise<boolean> {
    return willowBankTable
      .update({
          email: email.toLowerCase(),
        },
        {
          acceptedTermsAndConditions: accepted,
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
      .where("email")
      .eq(email.toLowerCase())
      .attributes(["account"])
      .exec()
      .then((result: any) => {
        return JSON.parse(result[0].account);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  public static getSettings(email: string): Promise<Settings> {
    return willowBankTable
      .query()
      .where("email")
      .eq(email.toLowerCase())
      .attributes(["settings"])
      .exec()
      .then((result: any) => {
        return JSON.parse(result[0].settings);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  public static updateSettings(email: string, settings: Settings): Promise<Settings> {
    return willowBankTable
      .update({
          email: email.toLowerCase(),
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

  public static getEtransferData(email: string): Promise<Etransfer> {
    return willowBankTable
      .query()
      .where("email")
      .eq(email.toLowerCase())
      .attributes(["etransfer"])
      .exec()
      .then((result: any) => {
        return JSON.parse(result[0].etransfer);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  public static updateTwoFactorAuthentication(email: string, data: object): Promise<boolean> {
    return willowBankTable
      .update({
          email: email.toLowerCase(),
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

  public static updateTwoFactorAuthenticationEnabled(email: string, enabled: boolean): Promise<boolean> {
    return willowBankTable
      .update({
          email: email.toLowerCase(),
        },
        {
          twoFactorAuthenticationEnabled: enabled,
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
          email: email.toLowerCase(),
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

  public static updateEtransferData(email: string, data: object): Promise<boolean> {
    return willowBankTable
      .update({
          email: email.toLowerCase(),
        },
        {
          etransfer: JSON.stringify(data),
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
