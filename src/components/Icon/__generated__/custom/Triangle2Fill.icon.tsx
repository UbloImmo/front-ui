import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2Fill = (props: CommonIconProps): JSX.Element => {
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
      viewBox="0 0 16 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon"
    >
      <g clipPath="url(#clip0_1422_68)" >
        <path
          d="M6.83424 0H9.16112C9.3646 0 9.54777 0.123301 9.62436 0.311811L15.7181 15.3118C15.8517 15.6406 15.6098 16 15.2549 16H0.740493C0.385612 16 0.143691 15.6406 0.27726 15.3118L6.37101 0.311811C6.44759 0.123301 6.63077 0 6.83424 0Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_68" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
