import {
  confirmed,
  email,
  min,
  max,
  required,
  max_value,
  numeric,
  min_value,
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

extend("min_value", {
  ...min_value,
  message: "Cannot be less than $1",
});

extend("max_value", {
  ...max_value,
  message: "Cannot be more than $10,000",
});
