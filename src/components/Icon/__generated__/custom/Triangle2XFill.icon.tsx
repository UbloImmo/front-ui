import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-x-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2XFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7.02168 14.4363C7.46709 15.1879 8.55493 15.1879 9.00035 14.4363L15.8596 2.86128C16.3139 2.09468 15.7614 1.125 14.8703 1.125H1.15176C0.260673 1.125 -0.291856 2.09468 0.162422 2.86127L7.02168 14.4363ZM10.3645 3.64645C10.5598 3.84171 10.5598 4.15829 10.3645 4.35355L8.71809 6L10.3645 7.64645C10.5598 7.84171 10.5598 8.15829 10.3645 8.35355C10.1693 8.54882 9.8527 8.54882 9.65743 8.35355L8.01099 6.70711L6.36454 8.35355C6.16928 8.54882 5.85269 8.54882 5.65743 8.35355C5.46217 8.15829 5.46217 7.84171 5.65743 7.64645L7.30388 6L5.65743 4.35355C5.46217 4.15829 5.46217 3.84171 5.65743 3.64645C5.85269 3.45118 6.16928 3.45118 6.36454 3.64645L8.01099 5.29289L9.65743 3.64645C9.8527 3.45118 10.1693 3.45118 10.3645 3.64645Z"
        fill={color}
      />
    </svg>
  );
};
