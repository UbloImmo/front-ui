import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-destroyed`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2Destroyed = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_74)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16099 0C9.36439 0 9.54822 0.123125 9.62486 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741067L0.675637 15.9961C0.357173 15.9554 0.152026 15.6197 0.2772 15.3115L6.37095 0.311523C6.43801 0.146604 6.58718 0.0319804 6.75962 0.00585938L6.83482 0H9.16099ZM1.48325 15H6.86802L3.14536 10.9053L1.48325 15ZM3.56333 9.87891L8.21861 15H14.5126L14.2918 14.458L7.34263 12.1416C6.79722 11.9595 6.517 11.3562 6.73032 10.8223L8.38755 6.67871L5.65611 4.72754L3.56333 9.87891ZM8.00279 5.17383L8.96958 5.86523C9.34419 6.1331 9.4872 6.62216 9.31626 7.0498L7.65904 11.1934L13.7967 13.2383L9.69517 3.14258L8.00279 5.17383ZM6.04282 3.77441L7.18638 4.5918L9.26841 2.09277L8.82505 1H7.17075L6.04282 3.77441Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_74" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2Destroyed;
