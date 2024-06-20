import { isString } from "@ubloimmo/front-util";

import { Email } from "@types";

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isEmailString = (value: unknown): value is Email => {
  // reset regex before testing
  emailRegex.lastIndex = 0;
  // condition (string)
  if (!isString(value)) return false;
  // condition (email)
  return emailRegex.test(value);
};
