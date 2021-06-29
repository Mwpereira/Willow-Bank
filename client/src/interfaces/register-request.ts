export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  twoFactorAuthentication: {
    securityQuestionOne: string;
    securityAnswerOne: string;
    securityQuestionTwo: string;
    securityAnswerTwo: string;
  };
}
