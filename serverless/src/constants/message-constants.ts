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
     * Success message for Accepting Terms and Conditions
     */
    public static readonly ACCEPT_TERMS_AND_CONDITIONS: string = 'Completed';

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
     * Error message for Accepting Terms and Conditions
     */
    public static readonly ACCEPT_TERMS_AND_CONDITIONS_FAIL: string = 'Error';
}
