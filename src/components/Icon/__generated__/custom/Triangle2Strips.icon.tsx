import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-strips`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2Strips = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_40)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16102 0C9.36443 0 9.54826 0.123102 9.62488 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2548 16H0.741095L0.675665 15.9961C0.35712 15.9555 0.152003 15.6198 0.277228 15.3115L6.37098 0.311523C6.43805 0.146567 6.58716 0.0319463 6.75965 0.00585938L6.83485 0H9.16102ZM3.10828 11L1.48328 15H14.5126L12.8876 11H3.10828ZM3.51453 10H12.4813L10.8563 6H5.13953L3.51453 10ZM5.54578 5H10.4501L8.82508 1H7.17078L5.54578 5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_40" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2Strips;
