import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `circle-2nd-half`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Circle2NdHalf = (props: CommonIconProps): JSX.Element => {
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
        d="M8 0.999999C4.13401 0.999999 1 4.13401 1 8C1 11.866 4.13401 15 8 15L8 8C8 4.13401 8 0.999999 8 0.999999ZM8 -6.99382e-07C12.4183 -3.13124e-07 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 3.13124e-07 12.4183 6.99382e-07 8C1.08564e-06 3.58172 3.58172 -1.08564e-06 8 -6.99382e-07Z"
        fill={color}
      />
    </svg>
  );
};
