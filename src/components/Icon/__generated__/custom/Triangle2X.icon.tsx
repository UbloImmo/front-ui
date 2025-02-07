import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-x`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2X = (props: CommonIconProps): JSX.Element => {
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
        d="M10.3646 4.35356C10.5598 4.15829 10.5598 3.84171 10.3646 3.64645C10.1693 3.45119 9.85272 3.45119 9.65746 3.64645L8.01101 5.2929L6.36457 3.64645C6.1693 3.45119 5.85272 3.45119 5.65746 3.64645C5.4622 3.84171 5.4622 4.15829 5.65746 4.35356L7.30391 6L5.65746 7.64645C5.4622 7.84171 5.4622 8.15829 5.65746 8.35356C5.85272 8.54882 6.1693 8.54882 6.36457 8.35356L8.01101 6.70711L9.65746 8.35356C9.85272 8.54882 10.1693 8.54882 10.3646 8.35356C10.5598 8.15829 10.5598 7.84171 10.3646 7.64645L8.71812 6L10.3646 4.35356Z"
        fill={color}
      />
    </svg>
  );
};
