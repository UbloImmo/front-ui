import { type VoidFn, isNumber } from "@ubloimmo/front-util";

import {
  AvatarDefaultProps,
  AvatarPropsCount,
  AvatarPropsFirstLastName,
  AvatarPropsFullName,
} from "./Avatar.types";

import { RequiredNonNever } from "@/types/global/object.types";
import { isNonEmptyString, isPositive } from "@utils";

export const isAvatarPropsFullName = (
  mergedProps: AvatarDefaultProps,
): mergedProps is RequiredNonNever<AvatarPropsFullName> => {
  return "name" in mergedProps && isNonEmptyString(mergedProps.name);
};

export const isAvatarPropsFirstLastName = (
  mergedProps: AvatarDefaultProps,
): mergedProps is RequiredNonNever<AvatarPropsFirstLastName> => {
  return (
    "firstName" in mergedProps &&
    isNonEmptyString(mergedProps.firstName) &&
    "lastName" in mergedProps &&
    isNonEmptyString(mergedProps.lastName)
  );
};

export const isAvatarPropsCount = (
  mergedProps: AvatarDefaultProps,
  warn?: VoidFn<[unknown]>,
): mergedProps is RequiredNonNever<AvatarPropsCount> => {
  const containsCount = "count" in mergedProps && isNumber(mergedProps.count);
  if (!containsCount) return false;
  const isValidCount = isPositive(mergedProps.count);
  if (!isValidCount) {
    if (warn) warn("Count should be a positive number");
    return false;
  }
  return true;
};

export const isAvatarPropsWithUrl = (
  mergedProps: AvatarDefaultProps,
): mergedProps is AvatarDefaultProps & { avatarUrl: string } =>
  (isAvatarPropsFullName(mergedProps) ||
    isAvatarPropsFirstLastName(mergedProps)) &&
  "avatarUrl" in mergedProps &&
  isNonEmptyString(mergedProps?.avatarUrl);
