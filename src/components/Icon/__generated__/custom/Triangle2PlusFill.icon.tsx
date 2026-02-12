import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-plus-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2PlusFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_44)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16097 0C9.36437 0 9.54821 0.123117 9.62483 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741045C0.38623 15.9999 0.143652 15.6403 0.277178 15.3115L6.37093 0.311523C6.44753 0.123128 6.63142 4.04499e-05 6.83479 0H9.16097ZM8.06819 6.375C7.72323 6.37526 7.44319 6.65498 7.44319 7V9.20312H5.24007C4.89505 9.20312 4.61532 9.48317 4.61507 9.82812C4.61507 10.1733 4.89489 10.4531 5.24007 10.4531H7.44417V12.6572C7.44432 13.0023 7.72408 13.2822 8.06917 13.2822C8.41406 13.282 8.69402 13.0021 8.69417 12.6572V10.4531H10.8973C11.2424 10.453 11.5223 10.1732 11.5223 9.82812C11.522 9.48323 11.2422 9.20323 10.8973 9.20312H8.69319V7C8.69319 6.65482 8.41337 6.37499 8.06819 6.375Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_44" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2PlusFill;
