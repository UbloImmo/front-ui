import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from custom icon: `shelves`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Shelves = (props: CommonIconProps): JSX.Element => {
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
    >
      <g clipPath="url(#clip0_222_1003)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 16H16V0H0V16ZM8.5 1H15V15H8.5V1ZM7.5 1H1V9.5L7.5 9.5V1ZM1 10.5L7.5 10.5V15H1V10.5Z"
          fill={color}
        />
        <path
          d="M9.5 7.75C9.5 7.33579 9.83579 7 10.25 7C10.6642 7 11 7.33579 11 7.75C11 8.16421 10.6642 8.5 10.25 8.5C9.83579 8.5 9.5 8.16421 9.5 7.75Z"
          fill={color}
        />
        <path
          d="M5 5.25C5 4.83579 5.33579 4.5 5.75 4.5C6.16421 4.5 6.5 4.83579 6.5 5.25C6.5 5.66421 6.16421 6 5.75 6C5.33579 6 5 5.66421 5 5.25Z"
          fill={color}
        />
        <path
          d="M5 12.75C5 12.3358 5.33579 12 5.75 12C6.16421 12 6.5 12.3358 6.5 12.75C6.5 13.1642 6.16421 13.5 5.75 13.5C5.33579 13.5 5 13.1642 5 12.75Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_222_1003">
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
