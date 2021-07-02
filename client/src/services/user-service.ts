import ResponseUtils from "@/utils/response-utils";
import axios, {AxiosResponse} from "axios";

axios.defaults.withCredentials = true;

export default class UserService {
    private static readonly url: any =
        process.env.VUE_APP_MODE === "PRODUCTION"
            ? `https://${process.env.VUE_APP_API}`
            : `http://${process.env.VUE_APP_API_LOCAL}`;

    public static acceptedTermsAndConditions(): Promise<AxiosResponse> {
        return axios
            .put(`${this.url}/user/acceptedTermsAndConditions`)
            .then((response: AxiosResponse) => {
                return response;
            })
            .catch((error) => {
                return ResponseUtils.errorProcessor(error.response);
            });
    }
}
