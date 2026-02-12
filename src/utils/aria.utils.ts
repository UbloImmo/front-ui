import {
  isBoolean,
  isNullish,
  isNumber,
  isString,
  objectEntries,
  objectFromEntries,
  Optional,
} from "@ubloimmo/front-util";
import { type AriaAttributes, useMemo } from "react";

import type { AriaPropertyName, AriaProps } from "@/types/global";

export function extractAriaAttributes<TProps extends AriaProps>(
  props: TProps
): AriaAttributes {
  const entries = objectEntries(props).filter(
    (
      item
    ): item is [
      AriaPropertyName,
      (typeof item)[1] & AriaProps[AriaPropertyName],
    ] =>
      isString(item[0]) &&
      item[0].startsWith("aria-") &&
      (isNullish(item[1]) ||
        isString(item[1] || isBoolean(item[1]) || isNumber(item[1])))
  ) satisfies [AriaPropertyName, AriaProps[AriaPropertyName]][];
  const attributes = entries.map(
    ([key, value]): [AriaPropertyName, Optional<string>] => {
      const attribute: Optional<string> = isNullish(value)
        ? undefined
        : String(value);
      return [key, attribute];
    }
  );
  return objectFromEntries(attributes) as AriaAttributes;
}

export function useAriaProps<TProps extends AriaProps>(props: TProps) {
  return useMemo<AriaAttributes>(() => extractAriaAttributes(props), [props]);
}
