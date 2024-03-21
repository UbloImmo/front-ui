import { isString } from "@ubloimmo/front-util";
import { Email } from "../../../types";

// example.subdomain@domain.sub.com
const emailRegex = /[\w.\d]+@[\w.\d]+\.[\w.\d]+/g;

export const isEmailString = (value: unknown): value is Email => {
  // condition (string)
  if (!isString(value)) return false;
  // condition (email)
  return emailRegex.test(value);
};
