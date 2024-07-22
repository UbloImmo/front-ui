import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `grab-horizontal`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const GrabHorizontal = (props: CommonIconProps): JSX.Element => {
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
        d="M4 9.5C4.55228 9.5 5 9.94772 5 10.5C5 11.0523 4.55228 11.5 4 11.5C3.44772 11.5 3 11.0523 3 10.5C3 9.94772 3.44772 9.5 4 9.5Z"
        fill={color}
      />
      <path
        d="M4 4.5C4.55228 4.5 5 4.94772 5 5.5C5 6.05229 4.55228 6.5 4 6.5C3.44772 6.5 3 6.05229 3 5.5C3 4.94772 3.44772 4.5 4 4.5Z"
        fill={color}
      />
      <path
        d="M8 9.5C8.55228 9.5 9 9.94772 9 10.5C9 11.0523 8.55229 11.5 8 11.5C7.44772 11.5 7 11.0523 7 10.5C7 9.94772 7.44772 9.5 8 9.5Z"
        fill={color}
      />
      <path
        d="M8 4.5C8.55228 4.5 9 4.94772 9 5.5C9 6.05228 8.55228 6.5 8 6.5C7.44772 6.5 7 6.05228 7 5.5C7 4.94772 7.44772 4.5 8 4.5Z"
        fill={color}
      />
      <path
        d="M12 9.5C12.5523 9.5 13 9.94772 13 10.5C13 11.0523 12.5523 11.5 12 11.5C11.4477 11.5 11 11.0523 11 10.5C11 9.94772 11.4477 9.5 12 9.5Z"
        fill={color}
      />
      <path
        d="M12 4.5C12.5523 4.5 13 4.94772 13 5.5C13 6.05228 12.5523 6.5 12 6.5C11.4477 6.5 11 6.05228 11 5.5C11 4.94772 11.4477 4.5 12 4.5Z"
        fill={color}
      />
    </svg>
  );
};
