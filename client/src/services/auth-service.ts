import axios, {AxiosResponse} from "axios";
import {LoginRequest} from "@/interfaces/login-request";
import {RegisterRequest} from "@/interfaces/register-request";
import ResponseUtils from "@/utils/response-utils";
import WebsiteUtils from "@/utils/website-utils";
import store from "@/store";

axios.defaults.withCredentials = true;

export default class AuthService {
    private static readonly url: any =
        process.env.VUE_APP_MODE === "PRODUCTION"
            ? `https://${process.env.VUE_APP_API}`
            : `http://${process.env.VUE_APP_API_LOCAL}`;

    public static async register(
        request: RegisterRequest
    ): Promise<AxiosResponse> {
        return axios
            .post(`${this.url}/auth/register`, JSON.stringify(request))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return ResponseUtils.errorProcessor(error.response);
            });
    }

    public static async login(request: LoginRequest): Promise<AxiosResponse> {
        return axios
            .post(`${this.url}/auth/login`, JSON.stringify(request))
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return ResponseUtils.errorProcessor(error.response);
            });
    }

    public static async getRefreshToken(): Promise<AxiosResponse> {
        return axios
            .get(`${this.url}/auth/refreshToken`)
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return ResponseUtils.errorProcessor(error.response);
            });
    }

    public static async logout(): Promise<void> {
        const response = await axios
            .get(`${this.url}/auth/logout`)
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return ResponseUtils.errorProcessor(error.response);
            });
        if (response.status === 200) {
            store.commit('auth_logout');
            await WebsiteUtils.switchVue('login');
        }
    }
}
