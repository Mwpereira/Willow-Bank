import {options} from '@/constants/ky-constants';
import {LoginRequest} from '@/interfaces/login-request';
import {RegisterRequest} from '@/interfaces/register-request';
import store from '@/store';
import {createRequest} from '@/utils/request-utils';
import ResponseUtils from '@/utils/response-utils';
import WebsiteUtils from '@/utils/website-utils';

const ky = options;

export default class AuthService {
  private static readonly url: any =
    process.env.VUE_APP_MODE === 'PRODUCTION'
      ? `https://${process.env.VUE_APP_API}`
      : `http://${process.env.VUE_APP_API_LOCAL}`;

  public static async getRefreshToken(): Promise<any> {
    return ky
      .get(`${this.url}/auth/refreshToken`)
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async register(request: RegisterRequest): Promise<any> {
    return ky
      .post(`${this.url}/auth/register`, createRequest(request))
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async login(request: LoginRequest): Promise<object> {
    return ky
      .post(`${this.url}/auth/login`, createRequest(request))
      .catch((error) => {
        console.log(error)
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async logout(): Promise<void> {
    store.commit('auth_logout');
    await WebsiteUtils.switchVue('login');
    ky.get(`${this.url}/auth/logout`)
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async deleteUser(): Promise<any> {
    return ky
      .post(`${this.url}/auth/deleteUser`)
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async updateEmail(email: string): Promise<any> {
    return ky
      .put(`${this.url}/auth/updateEmail`, {json: {newEmail: email}})
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async changePassword(passwords: object): Promise<any> {
    return ky
      .put(
        `${this.url}/auth/changePassword`,
        createRequest({passwords: passwords})
      )
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }

  public static async updateTwoFactorAuthenticationEnabled(
    twoFactorAuthenticationEnabled: any
  ): Promise<any> {
    return ky
      .put(
        `${this.url}/auth/updateTFAState`,
        createRequest(twoFactorAuthenticationEnabled)
      )
      .catch((error) => {
        return ResponseUtils.errorProcessor(error.response);
      });
  }
}
