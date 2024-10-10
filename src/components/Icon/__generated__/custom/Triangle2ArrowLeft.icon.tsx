import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `triangle2-arrow-left`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowLeft = (props: CommonIconProps): JSX.Element => {
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
        d="M10.511 7.125C10.7872 7.125 11.011 6.90114 11.011 6.625C11.011 6.34886 10.7872 6.125 10.511 6.125L6.71815 6.125L7.86459 4.97855C8.05986 4.78329 8.05986 4.46671 7.86459 4.27144C7.66933 4.07618 7.35275 4.07618 7.15749 4.27144L5.15749 6.27144C4.96222 6.46671 4.96222 6.78329 5.15749 6.97855L7.15749 8.97855C7.35275 9.17381 7.66933 9.17381 7.86459 8.97855C8.05986 8.78329 8.05986 8.46671 7.86459 8.27144L6.71815 7.125L10.511 7.125Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.02168 14.4363C7.46709 15.1879 8.55493 15.1879 9.00035 14.4363L15.8596 2.86128C16.3139 2.09468 15.7614 1.125 14.8703 1.125L1.15176 1.125C0.260673 1.125 -0.291856 2.09468 0.162422 2.86127L7.02168 14.4363ZM8.14006 13.9265C8.08196 14.0245 7.94007 14.0245 7.88197 13.9265L1.02271 2.35147C0.96346 2.25148 1.03553 2.125 1.15176 2.125L14.8703 2.125C14.9865 2.125 15.0586 2.25148 14.9993 2.35147L8.14006 13.9265Z"
        fill={color}
      />
    </svg>
  );
};
