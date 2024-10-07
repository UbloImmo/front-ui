import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `cone-striped-fill-2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConeStripedFill2 = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1055_152)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.66027 0.933643C6.72567 0.725175 6.91886 0.583313 7.13735 0.583313H8.86284C9.08132 0.583313 9.27451 0.725175 9.33991 0.933643L13.5437 14.3333H14.9021C15.1782 14.3333 15.4021 14.5572 15.4021 14.8333C15.4021 15.1095 15.1782 15.3333 14.9021 15.3333H13.1873C13.18 15.3335 13.1728 15.3335 13.1656 15.3333H2.83463C2.8274 15.3335 2.82016 15.3335 2.8129 15.3333H1.09814C0.822002 15.3333 0.598145 15.1095 0.598145 14.8333C0.598145 14.5572 0.822002 14.3333 1.09814 14.3333H2.45645L6.66027 0.933643ZM6 5.66664C6 5.3905 6.22386 5.16664 6.5 5.16664H9.49997C9.77611 5.16664 9.99997 5.3905 9.99997 5.66664C9.99997 5.94278 9.77611 6.16664 9.49997 6.16664H6.5C6.22386 6.16664 6 5.94278 6 5.66664ZM4.5 10.25C4.5 9.97384 4.72386 9.74998 5 9.74998H11C11.2761 9.74998 11.5 9.97384 11.5 10.25C11.5 10.5261 11.2761 10.75 11 10.75H5C4.72386 10.75 4.5 10.5261 4.5 10.25Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1055_152" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
