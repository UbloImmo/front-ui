import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `triangle2-arrow-left-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowLeftFill = (props: CommonIconProps): JSX.Element => {
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
        d="M9.00035 14.4363C8.55493 15.1879 7.46709 15.1879 7.02168 14.4363L0.162422 2.86127C-0.291856 2.09468 0.260673 1.125 1.15176 1.125L14.8703 1.125C15.7614 1.125 16.3139 2.09468 15.8596 2.86128L9.00035 14.4363ZM10.5111 7.125C10.7873 7.125 11.0111 6.90114 11.0111 6.625C11.0111 6.34886 10.7873 6.125 10.5111 6.125L6.71823 6.125L7.86467 4.97855C8.05993 4.78329 8.05993 4.46671 7.86467 4.27144C7.66941 4.07618 7.35283 4.07618 7.15757 4.27144L5.15757 6.27144C4.9623 6.46671 4.9623 6.78329 5.15757 6.97855L7.15757 8.97855C7.35283 9.17381 7.66941 9.17381 7.86467 8.97855C8.05993 8.78329 8.05993 8.46671 7.86467 8.27144L6.71823 7.125L10.5111 7.125Z"
        fill={color}
      />
    </svg>
  );
};
