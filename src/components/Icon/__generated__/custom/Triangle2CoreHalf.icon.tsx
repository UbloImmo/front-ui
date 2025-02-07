import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-core-half`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2CoreHalf = (props: CommonIconProps): JSX.Element => {
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
      viewBox="0 0 17 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon"
    >
      <path
        d="M7.74204 11.1401C7.80256 11.2422 7.90672 11.2933 8.01088 11.2933L8.01088 3.15625L3.55931 3.15625C3.31717 3.15625 3.16703 3.41975 3.29047 3.62807L7.74204 11.1401Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.00035 14.4363C8.55494 15.1879 7.46709 15.1879 7.02168 14.4363L0.162422 2.86128C-0.291855 2.09468 0.260671 1.125 1.15176 1.125L14.8703 1.125C15.7614 1.125 16.3139 2.09468 15.8596 2.86127L9.00035 14.4363ZM7.88197 13.9265C7.94007 14.0245 8.08196 14.0245 8.14006 13.9265L14.9993 2.35147C15.0586 2.25148 14.9865 2.125 14.8703 2.125L1.15176 2.125C1.03553 2.125 0.963459 2.25148 1.02271 2.35147L7.88197 13.9265Z"
        fill={color}
      />
    </svg>
  );
};
