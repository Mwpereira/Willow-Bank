import ResponseUtils from "@/utils/response-utils";
import axios, { AxiosResponse } from "axios";
import { Settings } from "@/interfaces/settings";

axios.defaults.withCredentials = true;

export default class UserService {
  private static readonly url: any =
    process.env.VUE_APP_MODE === "PRODUCTION"
      ? `https://${process.env.VUE_APP_API}`
      : `http://${process.env.VUE_APP_API_LOCAL}`;

  public static async acceptedTermsAndConditions(): Promise<AxiosResponse> {
    return await axios
      .put(`${this.url}/user/acceptedTermsAndConditions`)
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

  public static async updateSettings(
    settings: Settings
  ): Promise<AxiosResponse> {
    return axios
      .put(`${this.url}/user/settings`, settings)
      .then((response: AxiosResponse) => {
        return response;
      })
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }
}
