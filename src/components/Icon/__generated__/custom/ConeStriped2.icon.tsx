import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `cone-striped-2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConeStriped2 = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1279_1823)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.13735 0.583313C6.91886 0.583313 6.72567 0.725175 6.66027 0.933643L2.45645 14.3333H1.09814C0.822002 14.3333 0.598145 14.5572 0.598145 14.8333C0.598145 15.1095 0.822002 15.3333 1.09814 15.3333H2.8129C2.82016 15.3335 2.8274 15.3335 2.83463 15.3333H13.1656C13.1728 15.3335 13.18 15.3335 13.1873 15.3333H14.9021C15.1782 15.3333 15.4021 15.1095 15.4021 14.8333C15.4021 14.5572 15.1782 14.3333 14.9021 14.3333H13.5437L9.33991 0.933643C9.27451 0.725175 9.08132 0.583313 8.86284 0.583313H7.13735ZM12.4957 14.3333L11.3715 10.75H4.62869L3.50451 14.3333H12.4957ZM4.94242 9.74998H11.0578L9.93358 6.16664H6.0666L4.94242 9.74998ZM6.38033 5.16664H9.61985L8.49567 1.58331H7.50451L6.38033 5.16664Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1279_1823" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
