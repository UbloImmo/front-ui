import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-exclamation`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2Exclamation = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_54)" >
        <path
          d="M8.00276 11.0283C8.41956 11.0284 8.75765 11.3664 8.75765 11.7832C8.75755 12.1999 8.4195 12.5381 8.00276 12.5381C7.586 12.5381 7.24797 12.1999 7.24788 11.7832C7.24788 11.3664 7.58594 11.0283 8.00276 11.0283Z"
          fill={color}
        />
        <path
          d="M8.00179 6.5C8.40574 6.50014 8.72166 6.84899 8.68147 7.25098L8.41683 9.89844C8.39538 10.1114 8.2158 10.2733 8.00179 10.2734C7.78768 10.2734 7.60822 10.1114 7.58675 9.89844L7.3221 7.25098C7.28189 6.8489 7.5977 6.5 8.00179 6.5Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16097 0C9.36436 0 9.54819 0.123144 9.62483 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741045L0.675616 15.9961C0.357216 15.9553 0.152044 15.6197 0.277178 15.3115L6.37093 0.311523C6.43798 0.146633 6.5872 0.0320071 6.7596 0.00585938L6.8348 0H9.16097ZM1.48323 15H14.5125L8.82503 1H7.17073L1.48323 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_54" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
