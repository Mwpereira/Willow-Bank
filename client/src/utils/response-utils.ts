import { AxiosResponse } from "axios";
import BuefyService from "@/services/buefy-service";
import AuthService from "@/services/auth-service";

/**
 * Response Utilities for Client
 */
export default class ResponseUtils {
  public static async errorProcessor(
    response: AxiosResponse
  ): Promise<AxiosResponse> {
    if (response === undefined) {
      await this.checkInvalidTokenError();
      BuefyService.dangerToast("Expired Token");
      return response;
    }
    switch (response.status) {
      case 502: {
        BuefyService.dangerToast("Server Offline");
        break;
      }
      case 409: {
        BuefyService.dangerToast(response.data.message);
        break;
      }
      case 404: {
        BuefyService.dangerToast(response.data.message);
        break;
      }
      case 403: {
        await this.checkInvalidTokenError();
        BuefyService.dangerToast("Expired Token");
        break;
      }
      case 401: {
        BuefyService.dangerToast(response.data.message);
        break;
      }
      case 400: {
        BuefyService.dangerToast(response.data.message);
        break;
      }
    }
    return response;
  }

  public static successProcessor(response: AxiosResponse): boolean {
    return response.status === 200;
  }

  public static successAuthProcessor(response: AxiosResponse): boolean {
    if (response.status === 302) {
      BuefyService.successToast("Signed In");
      return true;
    }
    if (response.status === 201) {
      BuefyService.successToast("Account Created");
      return true;
    }
    return false;
  }

  private static async checkInvalidTokenError(): Promise<void> {
    await AuthService.logout();
  }
}
