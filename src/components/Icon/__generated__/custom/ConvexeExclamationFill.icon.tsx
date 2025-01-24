import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-exclamation-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeExclamationFill = (props: CommonIconProps): JSX.Element => {
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
        d="M1.60417 0.860737C6.72602 -0.296743 9.39785 -0.276771 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417C16.2967 6.72602 16.2768 9.39785 15.1401 14.3959C15.056 14.7657 14.7657 15.0557 14.3958 15.1393C9.27398 16.2967 6.60215 16.2768 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958C-0.296743 9.27398 -0.276771 6.60215 0.859927 1.6041C0.944027 1.23431 1.23427 0.944331 1.60417 0.860737ZM7.09943 4.99504C7.04615 4.46228 7.46451 4 7.99992 4C8.53533 4 8.9537 4.46228 8.90042 4.99504L8.54968 8.50248C8.52143 8.78492 8.28377 9 7.99992 9C7.71608 9 7.47842 8.78492 7.45017 8.50248L7.09943 4.99504ZM7.00146 11C7.00146 10.4477 7.44918 10 8.00146 10C8.55375 10 9.00146 10.4477 9.00146 11C9.00146 11.5523 8.55375 12 8.00146 12C7.44918 12 7.00146 11.5523 7.00146 11Z"
        fill={color}
      />
    </svg>
  );
};
