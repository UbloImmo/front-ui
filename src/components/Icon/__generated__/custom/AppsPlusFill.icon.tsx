import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `apps-plus-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const AppsPlusFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1279_1739)" >
        <path
          d="M2 0C0.895431 0 0 0.89543 0 2V5C0 6.10457 0.89543 7 2 7H5C6.10457 7 7 6.10457 7 5V2C7 0.895431 6.10457 0 5 0H2Z"
          fill={color}
        />
        <path
          d="M2 9C0.895431 9 0 9.89543 0 11V14C0 15.1046 0.89543 16 2 16H5C6.10457 16 7 15.1046 7 14V11C7 9.89543 6.10457 9 5 9H2Z"
          fill={color}
        />
        <path
          d="M9 11C9 9.89543 9.89543 9 11 9H14C15.1046 9 16 9.89543 16 11V14C16 15.1046 15.1046 16 14 16H11C9.89543 16 9 15.1046 9 14V11Z"
          fill={color}
        />
        <path
          d="M12 4V6.5C12 6.77614 12.2239 7 12.5 7C12.7761 7 13 6.77614 13 6.5V4H15.5C15.7761 4 16 3.77614 16 3.5C16 3.22386 15.7761 3 15.5 3H13V0.5C13 0.223858 12.7761 0 12.5 0C12.2239 0 12 0.223858 12 0.5V3H9.5C9.22386 3 9 3.22386 9 3.5C9 3.77614 9.22386 4 9.5 4H12Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1279_1739" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
