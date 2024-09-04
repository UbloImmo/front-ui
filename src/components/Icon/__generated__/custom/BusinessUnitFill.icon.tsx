import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `business-unit-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const BusinessUnitFill = (props: CommonIconProps): JSX.Element => {
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
        d="M14 0H2C0.89543 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.89543 15.1046 0 14 0ZM1 2C1 1.44772 1.44772 1 2 1H14C14.5523 1 15 1.44772 15 2V14C15 14.5523 14.5523 15 14 15H13.0001V7.5C13.0001 7.32671 12.9104 7.16578 12.7629 7.07468C12.6155 6.98357 12.4315 6.97529 12.2765 7.05279L9 8.69102V3.5C9 3.32671 8.91027 3.16578 8.76287 3.07468C8.61546 2.98357 8.43139 2.97529 8.27639 3.05279L1 6.69098V2ZM2 15H3V14H2L2 15ZM4 15H5V14H4V15ZM6 15H7V14H6V15ZM10.0001 15H11.0001V14H10.0001V15ZM7 7V6H6V7H7ZM3 8H2V9H3V8ZM3 11V10H2V11H3ZM3 12H2V13H3V12ZM5 12H4V13H5V12ZM7 13V12H6V13H7ZM5 10H4V11H5V10ZM7 11V10H6V11H7ZM5 9V8H4V9H5ZM7 8H6V9H7V8ZM11.0001 10V11H10.0001V10H11.0001ZM10.0001 12H11.0001V13H10.0001V12Z"
        fill={color}
      />
    </svg>
  );
};
