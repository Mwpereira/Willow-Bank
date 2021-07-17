import {APIGatewayEvent, Handler, SQSEvent} from 'aws-lambda';
import UserUtils from '../utils/user-utils';

export const acceptedTermsAndConditions: Handler = async (event: APIGatewayEvent) => {
    return await UserUtils.acceptedTermsAndConditions(event);
}

export const getAccount: Handler = async (event: APIGatewayEvent) => {
    return await UserUtils.getAccount(event);
}

export const updateTwoFactorAuthentication: Handler = async (event: SQSEvent) => {
    return await UserUtils.updateTwoFactorAuthentication(event);
}

export const updatePayees: Handler = async (event: APIGatewayEvent) => {
    return await UserUtils.updatePayees(event);
}
