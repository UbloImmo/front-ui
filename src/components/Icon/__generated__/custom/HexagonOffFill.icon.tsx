import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `hexagon-off-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const HexagonOffFill = (props: CommonIconProps): JSX.Element => {
  const { color, size } = useMemo(() => {
    const mergedProps = mergeDefaultProps(commonIconDefaulProps, props);
    return {
      color: cssVarUsage(mergedProps.color),
      size: cssLengthUsage(mergedProps.size),
    };
  }, [props]);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon"
    >
      <path
        d="M14.5 12.2887L14.4436 12.3223L4.2143 2.09298L7.49998 0.133975C7.80938 -0.0446582 8.19058 -0.0446582 8.49998 0.133975L14.5 3.71132C14.8094 3.88995 15 4.22008 15 4.57734V11.4226C15 11.7799 14.8094 12.11 14.5 12.2887Z"
        fill={color}
      />
      <path
        d="M1.14645 1.85355C0.951184 1.65829 0.951184 1.34171 1.14645 1.14645C1.34171 0.951184 1.65829 0.951184 1.85355 1.14645L14.8536 14.1464C15.0488 14.3417 15.0488 14.6583 14.8536 14.8536C14.6583 15.0488 14.3417 15.0488 14.1464 14.8536L1.14645 1.85355Z"
        fill={color}
      />
      <path
        d="M1.5 3.71132L1.55638 3.6777L11.7857 13.907L8.49998 15.866C8.19058 16.0447 7.80938 16.0447 7.49998 15.866L1.5 12.2887C1.1906 12.11 1 11.7799 1 11.4226V4.57734C1 4.22008 1.1906 3.88995 1.5 3.71132Z"
        fill={color}
      />
    </svg>
  );
};
