import { isObject, isString } from "@ubloimmo/front-util";
import { BootstrapIconFile, CustomIconFile } from "./svg.types";

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

export const isCustomIconFile = (
  value: BootstrapIconFile | CustomIconFile
): value is CustomIconFile => {
  return (
    isObject(value) &&
    isString(value.svg) &&
    isString(value.name) &&
    isString((value as CustomIconFile)?.componentName) &&
    isString((value as CustomIconFile)?.nodeId)
  );
};
