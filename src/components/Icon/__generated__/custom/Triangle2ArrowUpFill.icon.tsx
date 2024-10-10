import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `triangle2-arrow-up-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowUpFill = (props: CommonIconProps): JSX.Element => {
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
        d="M9.00035 14.4363C8.55493 15.1879 7.46709 15.1879 7.02168 14.4363L0.162422 2.86127C-0.291856 2.09468 0.260673 1.125 1.15176 1.125L14.8703 1.125C15.7614 1.125 16.3139 2.09468 15.8596 2.86128L9.00035 14.4363ZM7.51101 9.125C7.51101 9.40115 7.73487 9.625 8.01101 9.625C8.28715 9.625 8.51101 9.40115 8.51101 9.125V5.33211L9.65746 6.47856C9.85272 6.67382 10.1693 6.67382 10.3646 6.47856C10.5598 6.28329 10.5598 5.96671 10.3646 5.77145L8.36456 3.77145C8.1693 3.57619 7.85272 3.57619 7.65746 3.77145L5.65746 5.77145C5.46219 5.96671 5.46219 6.28329 5.65746 6.47856C5.85272 6.67382 6.1693 6.67382 6.36456 6.47856L7.51101 5.33211L7.51101 9.125Z"
        fill={color}
      />
    </svg>
  );
};
