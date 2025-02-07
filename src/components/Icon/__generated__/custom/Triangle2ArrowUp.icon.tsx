import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-arrow-up`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2ArrowUp = (props: CommonIconProps): JSX.Element => {
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
        d="M7.51104 9.125C7.51104 9.40114 7.7349 9.625 8.01104 9.625C8.28718 9.625 8.51104 9.40114 8.51104 9.125V5.3321L9.65749 6.47855C9.85275 6.67381 10.1693 6.67381 10.3646 6.47855C10.5599 6.28329 10.5599 5.96671 10.3646 5.77144L8.36459 3.77144C8.16933 3.57618 7.85275 3.57618 7.65749 3.77144L5.65749 5.77144C5.46222 5.96671 5.46222 6.28329 5.65749 6.47855C5.85275 6.67381 6.16933 6.67381 6.36459 6.47855L7.51104 5.3321L7.51104 9.125Z"
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
