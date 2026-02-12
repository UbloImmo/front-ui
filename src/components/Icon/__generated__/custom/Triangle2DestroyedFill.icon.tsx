import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-destroyed-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2DestroyedFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_72)" >
        <path
          d="M7.84751 16H0.741067C0.386186 16 0.143631 15.6403 0.2772 15.3115L2.37779 10.1387L7.84751 16Z"
          fill={color}
        />
        <path
          d="M7.3065 5.90723L8.38755 6.67871L6.74107 10.7959C6.51992 11.3488 6.82843 11.9714 7.4022 12.1309L15.3192 14.3301L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H9.2147L2.79185 9.11914L4.76353 4.2666L7.3065 5.90723Z"
          fill={color}
        />
        <path
          d="M14.8446 13.1611L7.66978 11.168L9.31626 7.0498C9.4872 6.62216 9.34419 6.1331 8.96958 5.86523L8.00474 5.17578L10.4442 2.33008L14.8446 13.1611Z"
          fill={color}
        />
        <path
          d="M9.16099 0C9.3644 0 9.54823 0.123117 9.62486 0.311523L10.0213 1.28711L7.16099 4.62305L5.14634 3.32324L6.37095 0.311523C6.44756 0.123078 6.63139 0 6.83482 0H9.16099Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_72" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2DestroyedFill;
