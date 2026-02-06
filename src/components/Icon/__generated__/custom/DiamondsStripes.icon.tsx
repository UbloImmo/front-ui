import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `diamonds-stripes`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const DiamondsStripes = (props: CommonIconProps): JSX.Element => {
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
        d="M8.0001 2.19985L8.33935 1.8606C8.92513 1.27482 9.87488 1.27482 10.4607 1.86061L15.5518 6.95178C16.1376 7.53756 16.1376 8.48731 15.5518 9.07309L10.4607 14.1643C9.87488 14.75 8.92513 14.75 8.33935 14.1643L8.0001 13.825L7.66086 14.1643C7.07508 14.75 6.12533 14.75 5.53954 14.1643L0.448372 9.07309C-0.137414 8.48731 -0.137413 7.53756 0.448374 6.95177L5.53954 1.8606C6.12533 1.27482 7.07508 1.27482 7.66086 1.86061L8.0001 2.19985ZM8.0001 3.61406L12.0449 7.65888C12.2354 7.84939 12.2401 8.15539 12.0588 8.35153L7.66073 3.95343L8.0001 3.61406ZM6.95363 4.66054L6.66073 4.95343L11.0591 9.35181L11.352 9.05891L6.95363 4.66054ZM5.95363 5.66054L10.352 10.0589L10.0591 10.3518L5.66073 5.95343L5.95363 5.66054ZM4.95363 6.66054L4.66073 6.95343L9.0591 11.3518L9.352 11.0589L4.95363 6.66054ZM3.95363 7.66054L8.352 12.0589L8.0001 12.4108L3.95528 8.36599C3.76058 8.17128 3.76002 7.85594 3.95363 7.66054ZM8.70721 2.90695L9.04646 2.56771C9.24172 2.37245 9.5583 2.37245 9.75356 2.56771L14.8447 7.65888C15.04 7.85414 15.04 8.17072 14.8447 8.36599L9.75356 13.4572C9.5583 13.6524 9.24172 13.6524 9.04645 13.4572L8.70721 13.1179L12.752 9.07309C13.3378 8.48731 13.3378 7.53756 12.752 6.95178L8.70721 2.90695ZM7.293 13.1179L6.95375 13.4572C6.75849 13.6524 6.44191 13.6524 6.24665 13.4572L1.15548 8.36599C0.960218 8.17072 0.960217 7.85414 1.15548 7.65888L6.24665 2.56771C6.44191 2.37245 6.75849 2.37245 6.95376 2.56771L7.293 2.90695L3.24818 6.95177C2.66239 7.53756 2.66239 8.48731 3.24818 9.07309L7.293 13.1179Z"
        fill={color}
      />
    </svg>
  );
};

export default DiamondsStripes;
