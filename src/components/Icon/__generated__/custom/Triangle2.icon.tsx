import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2 = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_50)" >
        <path
          d="M9.16102 0C9.36444 0 9.54827 0.123097 9.62489 0.311523L15.7186 15.3115C15.8522 15.6403 15.6097 16 15.2548 16H0.7411L0.67567 15.9961C0.35711 15.9555 0.151998 15.6198 0.277233 15.3115L6.37098 0.311523C6.43806 0.14656 6.58716 0.03194 6.75965 0.00585938L6.83485 0H9.16102ZM1.48329 15H14.5126L8.82508 1H7.17079L1.48329 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_50" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2;
