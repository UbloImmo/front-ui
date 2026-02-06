import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-arrow-down-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2ArrowDownFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_78)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16099 0C9.3644 0 9.54823 0.123117 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741067C0.386186 16 0.143631 15.6403 0.2772 15.3115L6.37095 0.311523C6.44756 0.123078 6.63139 0 6.83482 0H9.16099ZM7.9979 5C7.72186 5.00011 7.4979 5.22393 7.4979 5.5V11.293L5.85142 9.64648C5.65615 9.4513 5.33962 9.45126 5.14439 9.64648C4.94925 9.84173 4.94923 10.1583 5.14439 10.3535L7.64439 12.8535C7.67842 12.8875 7.71756 12.9134 7.75767 12.9355C7.80189 12.96 7.84913 12.9801 7.90025 12.9902C7.96495 13.0031 8.03185 13.0032 8.09654 12.9902C8.14761 12.98 8.19495 12.96 8.23911 12.9355C8.27896 12.9135 8.31758 12.8873 8.35142 12.8535L10.8514 10.3535C11.0467 10.1583 11.0467 9.84174 10.8514 9.64648C10.6562 9.4513 10.3396 9.45126 10.1444 9.64648L8.4979 11.293V5.5C8.4979 5.22386 8.27404 5.00001 7.9979 5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_78" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2ArrowDownFill;
