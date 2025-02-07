import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-arrow-down-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowDownFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7.02168 14.4363C7.46709 15.1879 8.55493 15.1879 9.00035 14.4363L15.8596 2.86127C16.3139 2.09468 15.7614 1.125 14.8703 1.125H1.15176C0.260673 1.125 -0.291856 2.09468 0.162422 2.86127L7.02168 14.4363ZM8.01104 3.625C8.28718 3.625 8.51104 3.84886 8.51104 4.125V7.91789L9.65749 6.77144C9.85275 6.57618 10.1693 6.57618 10.3646 6.77144C10.5599 6.96671 10.5599 7.28329 10.3646 7.47855L8.36459 9.47855C8.16933 9.67381 7.85275 9.67381 7.65749 9.47855L5.65749 7.47855C5.46222 7.28329 5.46222 6.96671 5.65749 6.77144C5.85275 6.57618 6.16933 6.57618 6.36459 6.77144L7.51104 7.91789V4.125C7.51104 3.84886 7.7349 3.625 8.01104 3.625Z"
        fill={color}
      />
    </svg>
  );
};
