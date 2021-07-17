/**
 * Response Messages
 */
export abstract class MessageConstants {
    /**
     * Success message for User Created
     */
    public static readonly USER_CREATED: string = 'User Created';

    /**
     * Success message for User Authorized
     */
    public static readonly USER_AUTHORIZED: string = 'Signed In';

    /**
     * Success message for Valid Token
     */
    public static readonly VALID_TOKEN: string = 'Valid Token';

    /**
     * Success message for Logging Out
     */
    public static readonly EXPIRED_TOKEN: string = 'Signed Out';

    /**
     * Success message for Accepting Terms and Conditions
     */
    public static readonly ACCEPTED_TERMS_AND_CONDITIONS: string = 'Completed';

    /**
     * Success message for getting user's Account
     */
    public static readonly ACCOUNT_GET_SUCCESS: string = 'Retrieved Account';

    /**
     * Success message for updating Two Factor Authentication
     */
    public static readonly TFA_UPDATED: string = 'TFA Updated';

    /**
     * Success message for adding a Payee
     */
    public static readonly PAYEE_ADDED: string = 'Payee Added';

    /**
     * Success message for deleting a Payee
     */
    public static readonly PAYEE_DELETED: string = 'Payee Removed';

    /**
     * Error message for Email already in use
     */
    public static readonly EMAIL_TAKEN: string = 'Email Already Taken';

    /**
     * Error message for Invalid Credentials
     */
    public static readonly INVALID_CREDENTIALS: string =
        'Wrong Username/Password';

    /**
     * Error message for a Server Error
     */
    public static readonly DATABASE_ERROR: string = 'Database Error';

    /**
     * Error message for an Invalid Request
     */
    public static readonly INVALID_REQUEST: string = 'Invalid Request';

    /**
     * Error message for an Invalid Token
     */
    public static readonly INVALID_TOKEN: string = 'Invalid Token';

    /**
     * Error message for an Invalid Token
     */
    public static readonly TOKEN_NOT_FOUND: string = 'Token not found';

    /**
     * Error message for No Login
     */
    public static readonly NO_LOGIN: string = 'No Login';

    /**
     * Error message for Accepting Terms and Conditions
     */
    public static readonly ACCEPT_TERMS_AND_CONDITIONS_FAIL: string = 'Error';

    /**
     * Error message for failing to get user's Account
     */
    public static readonly ACCOUNT_GET_FAILED: string = 'Failed to get account';

    /**
     * Error message for an Invalid Message
     */
    public static readonly INVALID_MESSAGE: string = 'Invalid Message';

    /**
     * Error message for updating Payees
     */
    public static readonly PAYEES_UPDATE_FAILED: string = 'Payees Failed to Update';
}
