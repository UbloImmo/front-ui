import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-question-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2QuestionFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_60)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16099 0C9.3644 0 9.54823 0.123117 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741067C0.386186 16 0.143631 15.6403 0.2772 15.3115L6.37095 0.311523C6.44756 0.123078 6.63139 0 6.83482 0H9.16099ZM7.9354 11.1152C7.49479 11.1152 7.17388 11.4076 7.17368 11.8242C7.17368 12.2266 7.49466 12.5244 7.9354 12.5244C8.39511 12.5243 8.71079 12.2265 8.71079 11.8242C8.7106 11.4077 8.39497 11.1154 7.9354 11.1152ZM8.07407 5.75C7.11779 5.75 6.06924 6.19593 5.9979 7.47559C5.9923 7.5783 6.07762 7.66113 6.18052 7.66113H6.80259C6.90667 7.66113 6.98962 7.57673 7.00376 7.47363C7.0709 6.97845 7.41064 6.6172 8.01646 6.61719C8.53385 6.61719 9.00767 6.87623 9.00767 7.49902C9.0075 7.97773 8.72542 8.19804 8.28013 8.5332C7.77232 8.90209 7.36955 9.33376 7.39829 10.0332L7.40025 10.1963C7.40166 10.2995 7.4865 10.3828 7.5897 10.3828H8.20103C8.30509 10.3828 8.39026 10.2984 8.39048 10.1943V10.1143C8.3905 9.57296 8.5965 9.41473 9.1522 8.99316C9.61197 8.64354 10.0906 8.25546 10.0907 7.44141C10.0907 6.30126 9.12799 5.75004 8.07407 5.75Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_60" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
