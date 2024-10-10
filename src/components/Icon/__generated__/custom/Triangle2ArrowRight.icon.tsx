import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `triangle2-arrow-right`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowRight = (props: CommonIconProps): JSX.Element => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.02168 14.4363C7.46709 15.1879 8.55493 15.1879 9.00035 14.4363L15.8596 2.86128C16.3139 2.09468 15.7614 1.125 14.8703 1.125L1.15176 1.125C0.260673 1.125 -0.291856 2.09468 0.162422 2.86127L7.02168 14.4363ZM8.14006 13.9265C8.08196 14.0245 7.94007 14.0245 7.88197 13.9265L1.02271 2.35147C0.96346 2.25148 1.03553 2.125 1.15176 2.125L14.8703 2.125C14.9865 2.125 15.0586 2.25148 14.9993 2.35147L8.14006 13.9265Z"
        fill={color}
      />
      <path
        d="M5.51101 6.125C5.23487 6.125 5.01101 6.34886 5.01101 6.625C5.01101 6.90114 5.23487 7.125 5.51101 7.125L9.30391 7.125L8.15746 8.27145C7.9622 8.46671 7.9622 8.78329 8.15746 8.97856C8.35272 9.17382 8.6693 9.17382 8.86456 8.97856L10.8646 6.97856C11.0598 6.78329 11.0598 6.46671 10.8646 6.27145L8.86456 4.27145C8.6693 4.07619 8.35272 4.07619 8.15746 4.27145C7.9622 4.46671 7.9622 4.78329 8.15746 4.97856L9.30391 6.125L5.51101 6.125Z"
        fill={color}
      />
    </svg>
  );
};
