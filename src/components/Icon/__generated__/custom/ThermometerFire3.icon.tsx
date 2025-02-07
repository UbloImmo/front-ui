import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `thermometer-fire-3`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ThermometerFire3 = (props: CommonIconProps): JSX.Element => {
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
      <path
        d="M13 13C13 12.4477 13.4477 12 14 12C14.5523 12 15 12.4477 15 13C15 13.5523 14.5523 14 14 14C13.4477 14 13 13.5523 13 13Z"
        fill={color}
      />
      <path
        d="M13.098 6.99504C13.0447 6.46228 13.463 6 13.9985 6C14.5339 6 14.9522 6.46228 14.899 6.99504L14.5482 10.5025C14.52 10.7849 14.2823 11 13.9985 11C13.7146 11 13.477 10.7849 13.4487 10.5025L13.098 6.99504Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C6.61929 0 5.5 1.11929 5.5 2.5V10.0505C4.88196 10.6813 4.5 11.5463 4.5 12.5C4.5 14.433 6.067 16 8 16C9.933 16 11.5 14.433 11.5 12.5C11.5 11.5463 11.118 10.6813 10.5 10.0505V2.5C10.5 1.11929 9.38071 0 8 0ZM7.5 1.08535V11.0854C6.9174 11.2913 6.5 11.8469 6.5 12.5C6.5 13.3284 7.17157 14 8 14C8.82843 14 9.5 13.3284 9.5 12.5C9.5 11.8469 9.0826 11.2913 8.5 11.0854V1.08535C9.0826 1.29127 9.5 1.84689 9.5 2.5V10.4874L9.66654 10.6365C10.1788 11.0949 10.5 11.7596 10.5 12.5C10.5 13.8807 9.38071 15 8 15C6.61929 15 5.5 13.8807 5.5 12.5C5.5 11.7596 5.8212 11.0949 6.33346 10.6365L6.5 10.4874V2.5C6.5 1.84689 6.9174 1.29127 7.5 1.08535Z"
        fill={color}
      />
      <path
        d="M1.5 8C1.5 7.44772 1.94772 7 2.5 7C3.05228 7 3.5 7.44772 3.5 8C3.5 8.55228 3.05228 9 2.5 9C1.94772 9 1.5 8.55228 1.5 8Z"
        fill={color}
      />
      <path
        d="M1.59796 1.99504C1.54469 1.46228 1.96305 1 2.49846 1C3.03387 1 3.45223 1.46228 3.39896 1.99504L3.04821 5.50248C3.01997 5.78492 2.7823 6 2.49846 6C2.21461 6 1.97695 5.78492 1.94871 5.50248L1.59796 1.99504Z"
        fill={color}
      />
    </svg>
  );
};
