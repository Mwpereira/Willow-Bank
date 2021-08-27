/**
 * Response Messages
 */
export abstract class MessageConstants {
  /**
   * Success message for User Created
   */
  public static readonly USER_CREATED: string = "User Created";

  /**
   * Success message for User Authorized
   */
  public static readonly USER_AUTHORIZED: string = "Signed In";

  /**
   * Success message for Valid Token
   */
  public static readonly VALID_TOKEN: string = "Valid Token";

  /**
   * Success message for Logging Out
   */
  public static readonly EXPIRED_TOKEN: string = "Signed Out";

  /**
   * Success message for Accepting Terms and Conditions
   */
  public static readonly ACCEPTED_TERMS_AND_CONDITIONS: string = "Completed";

  /**
   * Success message for getting user's Account
   */
  public static readonly ACCOUNT_GET_SUCCESS: string = "Retrieved Account";

  /**
   * Success message for getting user's Settings
   */
  public static readonly SETTINGS_GET_SUCCESS: string = "Retrieved Settings";

  /**
   * Success message for updating user's Settings
   */
  public static readonly SETTINGS_UPDATE_SUCCESS: string = "Updated Settings";

  /**
   * Success message for updating Two Factor Authentication
   */
  public static readonly TFA_UPDATED_SUCCESS: string = "TFA Updated";

  /**
   * Success message for updating Two Factor Authentication
   */
  public static readonly TFA_ENABLED_UPDATE_SUCCESS: string = "TFA State Updated";

  /**
   * Success message for adding a Payee
   */
  public static readonly PAYEE_ADDED_SUCCESS: string = "Payee Added";

  /**
   * Success message for deleting a Payee
   */
  public static readonly PAYEE_DELETED_SUCCESS: string = "Payee Removed";

  /**
   * Success message for adding a Contact
   */
  public static readonly CONTACT_ADDED_SUCCESS: string = "Contact Added";

  /**
   * Success message for deleting a Contact
   */
  public static readonly CONTACT_DELETED_SUCCESS: string = "Contact Removed";

  /**
   * Success message for updating User's Email
   */
  public static readonly EMAIL_UPDATED_SUCCESS: string = "Email Updated";

  /**
   * Success message for changing User's Password
   */
  public static readonly PASSWORD_CHANGED_SUCCESS: string = "Password Changed";

  /**
   * Success message for an admin deposit in a User's account
   */
  public static readonly ADMIN_DEPOSIT_SUCCESS: string = "Money Deposited";

  /**
   * Success message for an admin withdraw in a User's account
   */
  public static readonly ADMIN_WITHDRAW_SUCCESS: string = "Money Withdrawn";

  /**
   * Error message for Email already in use
   */
  public static readonly EMAIL_TAKEN: string = "Email Already Taken";

  /**
   * Error message for Invalid Credentials
   */
  public static readonly INVALID_CREDENTIALS: string =
    "Wrong Username/Password";

  /**
   * Error message for a Server Error
   */
  public static readonly DATABASE_ERROR: string = "Database Error";

  /**
   * Error message for an Invalid Request
   */
  public static readonly INVALID_REQUEST: string = "Invalid Request";

  /**
   * Error message for an Invalid Token
   */
  public static readonly INVALID_TOKEN: string = "Invalid Token";

  /**
   * Error message for an Invalid Token
   */
  public static readonly TOKEN_NOT_FOUND: string = "Token not found";

  /**
   * Error message for No Login
   */
  public static readonly NO_LOGIN: string = "No Login";

  /**
   * Error message for Accepting Terms and Conditions
   */
  public static readonly ACCEPT_TERMS_AND_CONDITIONS_FAIL: string = "Error";

  /**
   * Error message for failing to get user's Account
   */
  public static readonly ACCOUNT_GET_FAILED: string = "Failed to get account";

  /**
   * Error message for failing to get user's Settings
   */
  public static readonly SETTINGS_GET_FAILED: string = "Failed to get settings";

  /**
   * Error message for failing to update user's Settings
   */
  public static readonly SETTINGS_UPDATE_FAILED: string = "Failed to update settings";


  /**
   * Success message for updating Two Factor Authentication's State
   */
  public static readonly TFA_ENABLED_UPDATE_FAILED: string = "TFA State Updated";

  /**
   * Error message for an Invalid Message
   */
  public static readonly INVALID_MESSAGE: string = "Invalid Message";

  /**
   * Error message for updating Payees
   */
  public static readonly PAYEES_UPDATE_FAILED: string = "Payees Failed to Update";

  /**
   * Error message for updating Contacts
   */
  public static readonly CONTACTS_UPDATE_FAILED: string = "Contacts Failed to Update";

  /**
   * Error message for updating User's Email
   */
  public static readonly EMAIL_UPDATED_FAILED: string = "Failed to Update Email";

  /**
   * Error message for changing User's Password
   */
  public static readonly PASSWORD_CHANGED_FAILED: string = "Failed to Change Password";

  /**
   * Error message for an admin transaction into a User's Account
   */
  public static readonly ADMIN_TRANSACTION_FAILED: string = "Transaction Failed";
}
