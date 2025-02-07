import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `cat-robot-2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const CatRobot2 = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1152_105)" >
        <path
          d="M4 9C4 9.55229 3.55228 10 3 10C2.44772 10 2 9.55229 2 9C2 8.44771 2.44772 8 3 8C3.55228 8 4 8.44771 4 9Z"
          fill={color}
        />
        <path
          d="M6 10.375C5.65482 10.375 5.375 10.6548 5.375 11C5.375 11.3452 5.65482 11.625 6 11.625H10C10.3452 11.625 10.625 11.3452 10.625 11C10.625 10.6548 10.3452 10.375 10 10.375H6Z"
          fill={color}
        />
        <path
          d="M14 9C14 9.55229 13.5523 10 13 10C12.4477 10 12 9.55229 12 9C12 8.44771 12.4477 8 13 8C13.5523 8 14 8.44771 14 9Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.625 4.99999H11.4286L14.3415 2.45118C14.9881 1.88542 16 2.3446 16 3.20376V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V3.20376C0 2.3446 1.01192 1.88542 1.6585 2.45118L4.57143 4.99999H7.375V3.38509C6.71716 3.13349 6.25 2.4963 6.25 1.75C6.25 0.783502 7.0335 0 8 0C8.9665 0 9.75 0.783502 9.75 1.75C9.75 2.4963 9.28284 3.13349 8.625 3.38509V4.99999ZM8.26777 2.45108L8 2.55349L7.73223 2.45108C7.44866 2.34262 7.25 2.06827 7.25 1.75C7.25 1.33579 7.58579 1 8 1C8.41421 1 8.75 1.33579 8.75 1.75C8.75 2.06827 8.55134 2.34262 8.26777 2.45108ZM1 3.20376L4.19569 5.99999H11.8043L15 3.20376V14C15 14.5523 14.5523 15 14 15H2C1.44772 15 1 14.5523 1 14L1 3.20376Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1152_105" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
