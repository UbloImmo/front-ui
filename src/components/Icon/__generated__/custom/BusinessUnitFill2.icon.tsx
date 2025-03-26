import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `business-unit-fill-2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const BusinessUnitFill2 = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1279_1832)" >
        <path d="M10 11H11V12H10V11Z" fill={color} />
        <path d="M11 13H10V14H11V13Z" fill={color} />
        <path d="M7 6H6V7H7V6Z" fill={color} />
        <path d="M3 8H2V9H3V8Z" fill={color} />
        <path d="M3 10H2V11H3V10Z" fill={color} />
        <path d="M2 12H3V13H2V12Z" fill={color} />
        <path d="M4 12H5V13H4V12Z" fill={color} />
        <path d="M6 12H7V13H6V12Z" fill={color} />
        <path d="M5 10H4V11H5V10Z" fill={color} />
        <path d="M7 10H6V11H7V10Z" fill={color} />
        <path d="M5 8H4V9H5V8Z" fill={color} />
        <path d="M7 8H6V9H7V8Z" fill={color} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 0H2C0.89543 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.89543 15.1046 0 14 0ZM12 9.30902V15L9 15V10.809L12 9.30902ZM1 7.80902V14C1 14.5523 1.44772 15 2 15L2 14H3V15H4V14H5V15H6V14H7V15H8V4.30902L1 7.80902Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1279_1832" >
          <rect width="16" height="16" rx="2" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
