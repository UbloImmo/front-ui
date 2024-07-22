import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `grab`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Grab = (props: CommonIconProps): JSX.Element => {
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
        d="M6.5 4C6.5 4.55228 6.05228 5 5.5 5C4.94772 5 4.5 4.55228 4.5 4C4.5 3.44772 4.94772 3 5.5 3C6.05228 3 6.5 3.44772 6.5 4Z"
        fill={color}
      />
      <path
        d="M11.5 4C11.5 4.55228 11.0523 5 10.5 5C9.94772 5 9.5 4.55228 9.5 4C9.5 3.44772 9.94772 3 10.5 3C11.0523 3 11.5 3.44772 11.5 4Z"
        fill={color}
      />
      <path
        d="M6.5 8C6.5 8.55228 6.05228 9 5.5 9C4.94772 9 4.5 8.55228 4.5 8C4.5 7.44772 4.94772 7 5.5 7C6.05228 7 6.5 7.44772 6.5 8Z"
        fill={color}
      />
      <path
        d="M11.5 8C11.5 8.55228 11.0523 9 10.5 9C9.94772 9 9.5 8.55228 9.5 8C9.5 7.44772 9.94772 7 10.5 7C11.0523 7 11.5 7.44772 11.5 8Z"
        fill={color}
      />
      <path
        d="M6.5 12C6.5 12.5523 6.05228 13 5.5 13C4.94772 13 4.5 12.5523 4.5 12C4.5 11.4477 4.94772 11 5.5 11C6.05228 11 6.5 11.4477 6.5 12Z"
        fill={color}
      />
      <path
        d="M11.5 12C11.5 12.5523 11.0523 13 10.5 13C9.94772 13 9.5 12.5523 9.5 12C9.5 11.4477 9.94772 11 10.5 11C11.0523 11 11.5 11.4477 11.5 12Z"
        fill={color}
      />
    </svg>
  );
};
