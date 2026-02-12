import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-shadows`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2Shadows = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_84)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16099 0C9.36439 0 9.54822 0.123125 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741067L0.675637 15.9961C0.357173 15.9554 0.152026 15.6197 0.2772 15.3115L6.37095 0.311523C6.43801 0.146604 6.58718 0.0319804 6.75962 0.00585938L6.83482 0H9.16099ZM1.48325 15H14.5126L14.1063 14H8.4979C8.22182 13.9999 7.9979 13.7761 7.9979 13.5C7.9979 13.2239 8.22182 13.0001 8.4979 13H13.7001L13.2938 12H8.4979C8.22182 11.9999 7.9979 11.7761 7.9979 11.5C7.9979 11.2239 8.22182 11.0001 8.4979 11H12.8876L12.4813 10H8.4979C8.22182 9.99993 7.9979 9.7761 7.9979 9.5C7.9979 9.2239 8.22182 9.00007 8.4979 9H12.0751L11.6688 8H8.4979C8.22182 7.99993 7.9979 7.7761 7.9979 7.5C7.9979 7.2239 8.22182 7.00007 8.4979 7H11.2626L10.8563 6H8.4979C8.22182 5.99993 7.9979 5.7761 7.9979 5.5C7.9979 5.2239 8.22182 5.00007 8.4979 5H10.4501L10.0438 4H8.4979C8.22182 3.99993 7.9979 3.7761 7.9979 3.5C7.9979 3.2239 8.22182 3.00007 8.4979 3H9.63755L9.2313 2H8.4979C8.22182 1.99993 7.9979 1.7761 7.9979 1.5C7.9979 1.2239 8.22182 1.00007 8.4979 1H7.17075L1.48325 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_84" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2Shadows;
