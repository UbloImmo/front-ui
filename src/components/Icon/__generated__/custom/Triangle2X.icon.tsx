import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-x`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2X = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_56)" >
        <path
          d="M9.55653 8.05762C9.80053 7.81419 10.1964 7.81407 10.4403 8.05762C10.684 8.30169 10.6842 8.6984 10.4403 8.94238L8.8827 10.499L10.4413 12.0576C10.6848 12.3016 10.6849 12.6984 10.4413 12.9424C10.1974 13.1863 9.80063 13.186 9.55653 12.9424L7.99794 11.3838L6.44032 12.9424C6.19634 13.1863 5.79965 13.1861 5.55555 12.9424C5.31199 12.6984 5.31206 12.3026 5.55555 12.0586L7.11415 10.5L5.55653 8.94238C5.31249 8.69832 5.3125 8.30169 5.55653 8.05762C5.80049 7.81411 6.19634 7.81414 6.44032 8.05762L7.99794 9.61523L9.55653 8.05762Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16103 4.06721e-07C9.36434 0.000100112 9.5483 0.123184 9.62489 0.311524L15.7186 15.3115C15.8521 15.6402 15.6095 15.9998 15.2548 16L0.7411 16L0.67567 15.9961C0.35711 15.9555 0.151998 15.6198 0.277233 15.3115L6.37099 0.311523C6.43809 0.146632 6.58721 0.0319329 6.75966 0.00585936L6.83485 0L9.16103 4.06721e-07ZM1.48329 15L14.5126 15L8.82509 1L7.17079 1L1.48329 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_56" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
