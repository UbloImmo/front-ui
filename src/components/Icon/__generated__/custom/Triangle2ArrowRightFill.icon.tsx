import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-arrow-right-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowRightFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7.02168 14.4363C7.46709 15.1879 8.55493 15.1879 9.00035 14.4363L15.8596 2.86127C16.3139 2.09468 15.7614 1.125 14.8703 1.125H1.15176C0.260673 1.125 -0.291856 2.09468 0.162422 2.86127L7.02168 14.4363ZM5.01104 6.625C5.01104 6.34886 5.2349 6.125 5.51104 6.125H9.30393L8.15749 4.97855C7.96222 4.78329 7.96222 4.46671 8.15749 4.27144C8.35275 4.07618 8.66933 4.07618 8.86459 4.27144L10.8646 6.27144C11.0599 6.46671 11.0599 6.78329 10.8646 6.97855L8.86459 8.97855C8.66933 9.17381 8.35275 9.17381 8.15749 8.97855C7.96222 8.78329 7.96222 8.46671 8.15749 8.27144L9.30393 7.125H5.51104C5.2349 7.125 5.01104 6.90114 5.01104 6.625Z"
        fill={color}
      />
    </svg>
  );
};
