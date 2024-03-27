import { isObject, isString } from "@ubloimmo/front-util";

import { BootstrapIconFile, CustomIconFile } from "./svg.types";

/**
 * Checks if the given value is a BootstrapIconFile.
 *
 * @param {BootstrapIconFile | CustomIconFile} value - the value to check
 * @return {boolean} true if the value is a BootstrapIconFile, false otherwise
 */
export const isBootstrapIconFile = (
  value: BootstrapIconFile | CustomIconFile
): value is BootstrapIconFile => {
  return (
    isObject(value) &&
    isString(value.svg) &&
    isString(value.name) &&
    (value as BootstrapIconFile)?.type === "bootstrap"
  );
};
