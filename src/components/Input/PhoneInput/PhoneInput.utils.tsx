import { isString } from "@ubloimmo/front-util";

import type { Nullable } from "@ubloimmo/front-util";

export const FRENCH_PHONE_PREFIX = "+33" as const;

/**
 * Converts a phone number to French format by replacing '0' with '+33 ' if it starts with '0'.
 *
 * @param {string} base - The input phone number.
 * @return {string} the formatted phone number.
 */
export const defaultToFrenchPhone = (base: Nullable<string>) => {
  const baseStr = isString(base) ? base.trim() : "";
  if (baseStr.startsWith("0")) {
    return baseStr.replace("0", `${FRENCH_PHONE_PREFIX} `);
  }
  return baseStr;
};
