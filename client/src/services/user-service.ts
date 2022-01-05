import { options } from "@/constants/ky-constants";
import { AdminTransaction } from "@/interfaces/admin-transaction";
import { Settings } from "@/interfaces/settings";
import { Transaction } from "@/interfaces/transaction";
import { UpdatePayeeRequest } from "@/interfaces/update-payee-request";
import { createRequest } from "@/utils/request-utils";
import ResponseUtils from "@/utils/response-utils";
import { EtransferTransaction } from "../../../serverless/src/interfaces/etransfer-transaction";

const ky = options;
export default class UserService {
  private static readonly url: any =
    process.env.VUE_APP_MODE === "PRODUCTION"
      ? `https://${process.env.VUE_APP_API}`
      : `http://${process.env.VUE_APP_API_LOCAL}`;

  public static async acceptedTermsAndConditions(): Promise<any> {
    return ky
      .post(
        `${this.url}/user/acceptedTermsAndConditions`,
        createRequest({ acceptedTermsAndConditions: true })
      )
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async getAccount(): Promise<any> {
    return ky.get(`${this.url}/user/account`).catch((error) => {
      return ResponseUtils.errorProcessor(error.response);
    });
  }

  public static async getSettings(): Promise<any> {
    return ky.get(`${this.url}/user/settings`).catch((error) => {
      return ResponseUtils.errorProcessor(error.response);
    });
  }

  public static async getEtransferData(): Promise<any> {
    return ky.get(`${this.url}/user/etransfer`).catch((error) => {
      return ResponseUtils.errorProcessor(error.response);
    });
  }

  public static async updateSettings(settings: Settings): Promise<any> {
    return ky(`${this.url}/user/settings`, createRequest(settings)).catch(
      (error) => {
        return ResponseUtils.errorProcessor(error.response);
      }
    );
  }

  public static async updatePayees(payee: UpdatePayeeRequest): Promise<any> {
    return ky
      .put(`${this.url}/user/account/updatePayees`, createRequest(payee))
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async updateContacts(payee: UpdatePayeeRequest): Promise<any> {
    return ky
      .put(`${this.url}/user/etransfer/updateContacts`, createRequest(payee))
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async payBill(transaction: Transaction): Promise<any> {
    return ky
      .post(`${this.url}/user/account/payBill`, createRequest(transaction))
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async sendEtransfer(
    transaction: EtransferTransaction
  ): Promise<any> {
    return ky
      .post(`${this.url}/user/etransfer/send`, createRequest(transaction))
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async sendAdminTransaction(
    transaction: AdminTransaction
  ): Promise<any> {
    return ky
      .post(`${this.url}/user/sendAdminTransaction`, createRequest(transaction))
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }
}
