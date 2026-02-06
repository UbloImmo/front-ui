import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `apps-plus`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const AppsPlus = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1279_1743)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2C0 0.89543 0.895431 0 2 0H5C6.10457 0 7 0.895431 7 2V5C7 6.10457 6.10457 7 5 7H2C0.89543 7 0 6.10457 0 5V2ZM2 1H5C5.55228 1 6 1.44772 6 2V5C6 5.55228 5.55228 6 5 6H2C1.44772 6 1 5.55228 1 5V2C1 1.44772 1.44772 1 2 1Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 11C0 9.89543 0.895431 9 2 9H5C6.10457 9 7 9.89543 7 11V14C7 15.1046 6.10457 16 5 16H2C0.89543 16 0 15.1046 0 14V11ZM2 10H5C5.55228 10 6 10.4477 6 11V14C6 14.5523 5.55228 15 5 15H2C1.44772 15 1 14.5523 1 14V11C1 10.4477 1.44772 10 2 10Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 9C9.89543 9 9 9.89543 9 11V14C9 15.1046 9.89543 16 11 16H14C15.1046 16 16 15.1046 16 14V11C16 9.89543 15.1046 9 14 9H11ZM15 11C15 10.4477 14.5523 10 14 10H11C10.4477 10 10 10.4477 10 11V14C10 14.5523 10.4477 15 11 15H14C14.5523 15 15 14.5523 15 14V11Z"
          fill={color}
        />
        <path
          d="M13 3H15.5C15.7761 3 16 3.22386 16 3.5L16 3.50283C15.9985 3.77767 15.7752 4 15.5 4H13V6.5C13 6.77614 12.7761 7 12.5 7C12.2239 7 12 6.77614 12 6.5V4H9.5C9.22386 4 9 3.77614 9 3.5C9 3.22386 9.22386 3 9.5 3H12V0.5C12 0.223858 12.2239 0 12.5 0C12.7761 0 13 0.223858 13 0.5V3Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1279_1743" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AppsPlus;
