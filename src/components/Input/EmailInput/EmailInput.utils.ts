import { isString } from "@ubloimmo/front-util";

import { Email } from "../../../types";

// example.subdomain@domain.sub.com
const emailRegex = /[\w.\d]+@[\w.\d]+\.[\w.\d]+/;

export const isEmailString = (value: unknown): value is Email => {
  // reset regex before testing
  emailRegex.lastIndex = 0;
  // condition (string)
  if (!isString(value)) return false;
  // condition (email)
  return emailRegex.test(value);
};
