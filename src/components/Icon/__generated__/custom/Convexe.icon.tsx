import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Convexe = (props: CommonIconProps): JSX.Element => {
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
        d="M3.51585 12.4807C5.30704 12.8399 6.68382 12.9982 8 13V3.00001L7.95726 3.00001C6.63559 3.00165 5.27669 3.16104 3.51928 3.51585C3.15619 5.32644 2.99837 6.7136 3.00001 8.04274C3.00165 9.36441 3.16104 10.7233 3.51585 12.4807Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.6041 0.859926C6.60215 -0.276771 9.27398 -0.296743 14.3958 0.860737C14.7657 0.944331 15.056 1.23431 15.1401 1.6041C16.2768 6.60215 16.2967 9.27398 15.1393 14.3958C15.0557 14.7657 14.7657 15.056 14.3959 15.1401C9.39785 16.2768 6.72602 16.2967 1.60417 15.1393C1.23427 15.0557 0.944026 14.7657 0.859927 14.3959C-0.276771 9.39785 -0.296743 6.72602 0.860736 1.60417C0.944331 1.23427 1.23431 0.944026 1.6041 0.859926ZM15 7.95478C14.9977 6.12859 14.726 4.29414 14.1669 1.83421C11.6464 1.26497 9.78116 0.997751 7.95478 1.00001C6.12859 1.00228 4.29414 1.274 1.83421 1.83313C1.26497 4.35355 0.997752 6.21885 1.00001 8.04522C1.00228 9.87141 1.274 11.7059 1.83313 14.1658C4.35355 14.735 6.21885 15.0023 8.04522 15C9.87141 14.9977 11.7059 14.726 14.1658 14.1669C14.735 11.6464 15.0023 9.78116 15 7.95478Z"
        fill={color}
      />
    </svg>
  );
};
