import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-clock-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeClockFill = (props: CommonIconProps): JSX.Element => {
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
        d="M1.60417 0.860737C6.72602 -0.296743 9.39785 -0.276771 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417C16.2967 6.72602 16.2768 9.39785 15.1401 14.3959C15.056 14.7657 14.7657 15.0557 14.3958 15.1393C9.27398 16.2967 6.60215 16.2768 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958C-0.296743 9.27398 -0.276771 6.60215 0.859927 1.6041C0.944027 1.23431 1.23427 0.944331 1.60417 0.860737ZM8 4.5C8 4.22386 7.77614 4 7.5 4C7.22386 4 7 4.22386 7 4.5V9C7 9.17563 7.09215 9.33838 7.24275 9.42875L9.74275 10.9287C9.97954 11.0708 10.2867 10.994 10.4287 10.7572C10.5708 10.5205 10.494 10.2133 10.2572 10.0713L8 8.7169V4.5Z"
        fill={color}
      />
    </svg>
  );
};
