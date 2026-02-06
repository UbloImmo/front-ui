import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `cat-robot-2-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const CatRobot2Off = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1279_1833)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.70696 1.70692C1.90222 1.51166 2.2188 1.51166 2.41406 1.70692L15.414 14.7069C15.6093 14.9022 15.6093 15.2188 15.414 15.414C15.2188 15.6093 14.9022 15.6093 14.7069 15.414L1.70696 2.41402C1.51169 2.21876 1.51169 1.90218 1.70696 1.70692Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.4286 4.99999H8.625V3.38509C9.28284 3.13349 9.75 2.4963 9.75 1.75C9.75 0.783502 8.9665 0 8 0C7.0335 0 6.25 0.783502 6.25 1.75C6.25 2.4963 6.71716 3.13349 7.375 3.38509V4.99999H7.12131L8.12131 5.99999H11.8043L15 3.20376V12.8787L16 13.8787V3.20376C16 2.3446 14.9881 1.88542 14.3415 2.45118L11.4286 4.99999ZM8 2.55349L8.26777 2.45108C8.55134 2.34262 8.75 2.06827 8.75 1.75C8.75 1.33579 8.41421 1 8 1C7.58579 1 7.25 1.33579 7.25 1.75C7.25 2.06827 7.44866 2.34262 7.73223 2.45108L8 2.55349Z"
          fill={color}
        />
        <path
          d="M1 3.12132C0.767311 2.88863 0.627052 2.59851 0.579223 2.29659C0.249168 2.44959 0 2.77743 0 3.20376V14C0 15.1046 0.895431 16 2 16H13.8787L12.8787 15H2C1.44772 15 1 14.5523 1 14V3.12132Z"
          fill={color}
        />
        <path
          d="M9.50368 11.625H6C5.65482 11.625 5.375 11.3452 5.375 11C5.375 10.6548 5.65482 10.375 6 10.375H8.25368L9.50368 11.625Z"
          fill={color}
        />
        <path
          d="M3 10C3.55228 10 4 9.55229 4 9C4 8.44771 3.55228 8 3 8C2.44772 8 2 8.44771 2 9C2 9.55229 2.44772 10 3 10Z"
          fill={color}
        />
        <path
          d="M14 9C14 9.55229 13.5523 10 13 10C12.4477 10 12 9.55229 12 9C12 8.44771 12.4477 8 13 8C13.5523 8 14 8.44771 14 9Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1279_1833" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CatRobot2Off;
