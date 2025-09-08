import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-heavy`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2Heavy = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_64)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16099 0C9.3644 0 9.54823 0.123117 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741067C0.386186 16 0.143631 15.6403 0.2772 15.3115L6.37095 0.311523C6.44756 0.123078 6.63139 0 6.83482 0H9.16099ZM8.22935 4.84766C8.14488 4.6398 7.85089 4.63978 7.76646 4.84766L4.59458 12.6562C4.52814 12.8204 4.64893 12.9997 4.82603 13H11.1708C11.348 12.9999 11.4687 12.8205 11.4022 12.6562L8.22935 4.84766Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_64" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
