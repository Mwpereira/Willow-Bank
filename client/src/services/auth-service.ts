import axios, {AxiosResponse} from "axios";
import {LoginRequest} from "@/interfaces/login-request";
import {RegisterRequest} from "@/interfaces/register-request";
import ResponseUtils from "@/utils/response-utils";

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
}
