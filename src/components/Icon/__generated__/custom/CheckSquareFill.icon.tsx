import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `check-square-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const CheckSquareFill = (props: CommonIconProps): JSX.Element => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM11.9268 5.21967C11.6339 4.92678 11.159 4.92678 10.8661 5.21967C10.859 5.22674 10.8524 5.23424 10.8462 5.2421L7.37385 9.66674L5.28033 7.57322C4.98744 7.28033 4.51256 7.28033 4.21967 7.57322C3.92678 7.86612 3.92678 8.34099 4.21967 8.63388L6.86612 11.2803C7.15901 11.5732 7.63388 11.5732 7.92678 11.2803C7.9333 11.2738 7.93946 11.2669 7.94522 11.2597L11.9374 6.26947C12.2196 5.97582 12.2161 5.50897 11.9268 5.21967Z"
        fill={color}
      />
    </svg>
  );
};
