import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-exclamation`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeExclamation = (props: CommonIconProps): JSX.Element => {
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
        d="M7.09943 4.99504C7.04615 4.46228 7.46451 4 7.99992 4C8.53533 4 8.9537 4.46228 8.90042 4.99504L8.54968 8.50248C8.52143 8.78492 8.28377 9 7.99992 9C7.71608 9 7.47842 8.78492 7.45017 8.50248L7.09943 4.99504Z"
        fill={color}
      />
      <path
        d="M7.00146 11C7.00146 10.4477 7.44918 10 8.00146 10C8.55375 10 9.00146 10.4477 9.00146 11C9.00146 11.5523 8.55375 12 8.00146 12C7.44918 12 7.00146 11.5523 7.00146 11Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.3959 0.859926C9.39785 -0.276771 6.72602 -0.296743 1.60417 0.860737C1.23427 0.944331 0.944027 1.23431 0.859927 1.6041C-0.276771 6.60215 -0.296743 9.27398 0.860737 14.3958C0.944331 14.7657 1.23431 15.056 1.6041 15.1401C6.60215 16.2768 9.27398 16.2967 14.3958 15.1393C14.7657 15.0557 15.056 14.7657 15.1401 14.3959C16.2768 9.39785 16.2967 6.72602 15.1393 1.60417C15.0557 1.23427 14.7657 0.944026 14.3959 0.859926ZM1.00001 7.95478C1.00228 6.12859 1.274 4.29414 1.83313 1.83421C4.35355 1.26497 6.21885 0.997751 8.04522 1.00001C9.87141 1.00228 11.7059 1.274 14.1658 1.83313C14.735 4.35355 15.0023 6.21885 15 8.04522C14.9977 9.87141 14.726 11.7059 14.1669 14.1658C11.6464 14.735 9.78116 15.0023 7.95478 15C6.12859 14.9977 4.29414 14.726 1.83422 14.1669C1.26498 11.6464 0.997751 9.78116 1.00001 7.95478Z"
        fill={color}
      />
    </svg>
  );
};
