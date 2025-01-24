import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-clock`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeClock = (props: CommonIconProps): JSX.Element => {
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
        d="M8 4.5C8 4.22386 7.77614 4 7.5 4C7.22386 4 7 4.22386 7 4.5V9C7 9.17563 7.09215 9.33838 7.24275 9.42875L9.74275 10.9287C9.97954 11.0708 10.2867 10.994 10.4287 10.7572C10.5708 10.5205 10.494 10.2133 10.2572 10.0713L8 8.7169V4.5Z"
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
