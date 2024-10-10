import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `triangle2-x-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2XFill = (props: CommonIconProps): JSX.Element => {
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
      viewBox="0 0 18 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon"
    >
      <path
        d="M6.51175 8L10.5117 4M10.5117 8L6.51175 4M7.52244 14.4363C7.96785 15.1879 9.0557 15.1879 9.50111 14.4363L16.3604 2.86128C16.8146 2.09468 16.2621 1.125 15.371 1.125L1.65252 1.125C0.761436 1.125 0.208907 2.09468 0.663185 2.86127L7.52244 14.4363Z"
        stroke={color}
        strokeLinecap="round"
      />
    </svg>
  );
};
