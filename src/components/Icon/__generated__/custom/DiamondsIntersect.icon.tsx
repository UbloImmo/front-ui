import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `diamonds-intersect`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const DiamondsIntersect = (props: CommonIconProps): JSX.Element => {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.33935 1.8606L8.0001 2.19985L7.66086 1.86061C7.07508 1.27482 6.12533 1.27482 5.53954 1.8606L0.448374 6.95177C-0.137413 7.53756 -0.137414 8.48731 0.448372 9.07309L5.53954 14.1643C6.12533 14.75 7.07508 14.75 7.66086 14.1643L8.0001 13.825L8.33935 14.1643C8.92513 14.75 9.87488 14.75 10.4607 14.1643L15.5518 9.07309C16.1376 8.48731 16.1376 7.53756 15.5518 6.95178L10.4607 1.86061C9.87488 1.27482 8.92513 1.27482 8.33935 1.8606ZM9.04646 2.56771L8.70721 2.90695L12.752 6.95178C13.3378 7.53756 13.3378 8.48731 12.752 9.07309L8.70721 13.1179L9.04645 13.4572C9.24172 13.6524 9.5583 13.6524 9.75356 13.4572L14.8447 8.36599C15.04 8.17072 15.04 7.85414 14.8447 7.65888L9.75356 2.56771C9.5583 2.37245 9.24172 2.37245 9.04646 2.56771ZM6.95375 13.4572L7.293 13.1179L3.24818 9.07309C2.66239 8.48731 2.66239 7.53756 3.24818 6.95177L7.293 2.90695L6.95376 2.56771C6.75849 2.37245 6.44191 2.37245 6.24665 2.56771L1.15548 7.65888C0.960217 7.85414 0.960218 8.17072 1.15548 8.36599L6.24665 13.4572C6.44191 13.6524 6.75849 13.6524 6.95375 13.4572Z"
        fill={color}
      />
    </svg>
  );
};

export default DiamondsIntersect;
