import PayloadValidatorUtils from './payload-validator-utils';

export default class RequestUtils {
    /**
     * Retrieves user from request
     *
     * @param event
     * @return user
     */
    static getRequest(event): any {
        return JSON.parse(event.body);
    }

    /**
     * Retrieves user's email from authorizer token
     *
     * @param event
     */
    static getEmail(event): string {
        return PayloadValidatorUtils.validateEmail(
            event.requestContext.authorizer.principalId
        );
    }
}
