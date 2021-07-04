import {
  alpha_dash,
  confirmed,
  email,
  min,
  max,
  required,
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", {
  ...required,
  message: "Required Field",
});

extend("email", {
  ...email,
  message: "This field must be a valid email",
});

extend("min_password", {
  ...min,
  message: "Password must be 7 or more characters long",
});

extend("confirmed", {
  ...confirmed,
  message: "Passwords do not match",
});

extend("max_account_characters", {
  ...max,
  message: "Exceeds 64 character limit",
});
