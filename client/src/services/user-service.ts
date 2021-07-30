import { AdminTransaction } from "@/interfaces/admin-transaction";
import { Settings } from "@/interfaces/settings";
import { Transaction } from "@/interfaces/transaction";
import { UpdatePayeeRequest } from "@/interfaces/update-payee-request";
import ResponseUtils from "@/utils/response-utils";
import axios, { AxiosResponse } from "axios";
import { EtransferTransaction } from "../../../serverless/src/interfaces/etransfer-transaction";

axios.defaults.withCredentials = true;

export default class UserService {
  private static readonly url: any =
    process.env.VUE_APP_MODE === "PRODUCTION"
      ? `https://${process.env.VUE_APP_API}`
      : `http://${process.env.VUE_APP_API_LOCAL}`;

  public static async acceptedTermsAndConditions(): Promise<AxiosResponse> {
    return axios
      .post(
        `${this.url}/user/acceptedTermsAndConditions`,
        JSON.stringify({ acceptedTermsAndConditions: true })
      )
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async getAccount(): Promise<AxiosResponse> {
    return axios
      .get(`${this.url}/user/account`)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async getSettings(): Promise<AxiosResponse> {
    return axios
      .get(`${this.url}/user/settings`)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async getEtransferData(): Promise<AxiosResponse> {
    return axios
      .get(`${this.url}/user/etransfer`)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async updateSettings(
    settings: Settings
  ): Promise<AxiosResponse> {
    return new axios.put(`${this.url}/user/settings`, settings)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async updatePayees(
    payee: UpdatePayeeRequest
  ): Promise<AxiosResponse> {
    return axios
      .put(`${this.url}/user/account/updatePayees`, payee)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async updateContacts(
    payee: UpdatePayeeRequest
  ): Promise<AxiosResponse> {
    return axios
      .put(`${this.url}/user/etransfer/updateContacts`, payee)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async payBill(
    transaction: Transaction
  ): Promise<AxiosResponse> {
    return axios
      .post(`${this.url}/user/account/payBill`, transaction)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async sendEtransfer(
    transaction: EtransferTransaction
  ): Promise<AxiosResponse> {
    return axios
      .post(`${this.url}/user/etransfer/send`, transaction)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async sendAdminTransaction(
    transaction: AdminTransaction
  ): Promise<AxiosResponse> {
    return axios
      .post(`${this.url}/user/sendAdminTransaction`, transaction)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }
}
