import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-arrow-down`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowDown = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_80)" >
        <path
          d="M7.99791 5C8.27405 5 8.4979 5.22386 8.4979 5.5V11.293L10.1444 9.64648C10.3396 9.45128 10.6561 9.45139 10.8514 9.64648C11.0467 9.84175 11.0467 10.1583 10.8514 10.3535L8.35142 12.8535C8.3176 12.8873 8.27893 12.9135 8.23912 12.9355C8.19498 12.96 8.14757 12.98 8.09654 12.9902C8.0319 13.0031 7.9649 13.0031 7.90025 12.9902C7.84919 12.9801 7.80185 12.96 7.75767 12.9355C7.7176 12.9134 7.67839 12.8875 7.64439 12.8535L5.14439 10.3535C4.94935 10.1583 4.94937 9.84171 5.14439 9.64648C5.3396 9.45128 5.65615 9.45139 5.85142 9.64648L7.49791 11.293V5.5C7.49791 5.22399 7.72194 5.00021 7.99791 5Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16099 0C9.36439 0 9.54823 0.123124 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741069L0.675639 15.9961C0.35717 15.9554 0.152024 15.6197 0.277202 15.3115L6.37095 0.311523C6.43801 0.146601 6.58718 0.031978 6.75962 0.00585938L6.83482 0H9.16099ZM1.48326 15H14.5126L8.82505 1H7.17076L1.48326 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_80" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
