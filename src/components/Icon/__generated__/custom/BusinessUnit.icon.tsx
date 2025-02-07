import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `business-unit`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const BusinessUnit = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_941_589)" >
        <path d="M11 13H10V14H11V13Z" fill={color} />
        <path d="M10 11H11V12H10V11Z" fill={color} />
        <path d="M3 12H2V13H3V12Z" fill={color} />
        <path d="M4 12H5V13H4V12Z" fill={color} />
        <path d="M7 12H6V13H7V12Z" fill={color} />
        <path d="M3 10H2V11H3V10Z" fill={color} />
        <path d="M4 10H5V11H4V10Z" fill={color} />
        <path d="M7 10H6V11H7V10Z" fill={color} />
        <path d="M2 8H3V9H2V8Z" fill={color} />
        <path d="M5 8H4V9H5V8Z" fill={color} />
        <path d="M6 8H7V9H6V8Z" fill={color} />
        <path d="M7 6H6V7H7V6Z" fill={color} />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0H14C15.1046 0 16 0.89543 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2C0 0.895431 0.89543 0 2 0ZM2 1C1.44772 1 1 1.44772 1 2V6.69098L8.27639 3.05279C8.34666 3.01765 8.4229 3.00015 8.499 3H8.50095C8.59205 3.00018 8.68286 3.02523 8.76287 3.07468C8.91027 3.16578 9 3.32671 9 3.5V9.69098L12.2764 8.05279C12.3469 8.01751 12.4235 8.00001 12.4999 8C12.5913 8.00001 12.6826 8.02506 12.7629 8.07468C12.9103 8.16578 13 8.32671 13 8.5V15H14C14.5523 15 15 14.5523 15 14V2C15 1.44772 14.5523 1 14 1H2ZM12 15V9.30902L9 10.809V15L12 15ZM1 14V7.80902L8 4.30902V15H7V14H6V15H5V14H4V15H3V14H2L2 15C1.44772 15 1 14.5523 1 14Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_941_589" >
          <rect width="16" height="16" rx="2" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
