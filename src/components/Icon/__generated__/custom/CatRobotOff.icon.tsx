import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `cat-robot-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const CatRobotOff = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1152_104)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.75 1.75C9.75 2.4963 9.28284 3.13349 8.625 3.38509V4.99999H11.4286L14.3415 2.45118C14.9881 1.88542 16 2.3446 16 3.20376V13.8787L7.12131 4.99999H7.375V3.38509C6.71716 3.13349 6.25 2.4963 6.25 1.75C6.25 0.783502 7.0335 0 8 0C8.9665 0 9.75 0.783502 9.75 1.75ZM13 10C13.5523 10 14 9.55229 14 9C14 8.44771 13.5523 8 13 8C12.4477 8 12 8.44771 12 9C12 9.55229 12.4477 10 13 10Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 16H13.8787L9.50368 11.625H6C5.65482 11.625 5.375 11.3452 5.375 11C5.375 10.6548 5.65482 10.375 6 10.375H8.25368L1 3.12132C0.767311 2.88863 0.627052 2.59851 0.579223 2.29659C0.249168 2.44959 0 2.77743 0 3.20376V14C0 15.1046 0.895431 16 2 16ZM4 9C4 9.55229 3.55228 10 3 10C2.44772 10 2 9.55229 2 9C2 8.44771 2.44772 8 3 8C3.55228 8 4 8.44771 4 9Z"
          fill={color}
        />
        <path
          d="M2.41406 1.70692C2.2188 1.51166 1.90222 1.51166 1.70696 1.70692C1.51169 1.90218 1.51169 2.21876 1.70696 2.41402L14.7069 15.414C14.9022 15.6093 15.2188 15.6093 15.414 15.414C15.6093 15.2188 15.6093 14.9022 15.414 14.7069L2.41406 1.70692Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1152_104" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
