import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-check-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2CheckFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_66)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16099 0C9.3644 0 9.54823 0.123117 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741067C0.386186 16 0.143631 15.6403 0.2772 15.3115L6.37095 0.311523C6.44756 0.123078 6.63139 0 6.83482 0H9.16099ZM10.3514 8.14648C10.1562 7.95127 9.83963 7.95124 9.64439 8.14648L6.9979 10.793L5.85142 9.64648C5.65615 9.45127 5.33963 9.45124 5.14439 9.64648C4.94919 9.84173 4.94919 10.1583 5.14439 10.3535L6.64439 11.8535C6.83963 12.0488 7.15615 12.0487 7.35142 11.8535L10.3514 8.85352C10.5467 8.65825 10.5467 8.34175 10.3514 8.14648Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_66" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
