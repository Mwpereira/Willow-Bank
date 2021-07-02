import {Handler} from 'aws-lambda';
import UserUtils from "../utils/user-utils";

export const acceptedTermsAndConditions: Handler = async (event) => {
    return await UserUtils.acceptedTermsAndConditions(event);
}
