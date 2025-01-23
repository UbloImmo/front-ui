import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeOff = (props: CommonIconProps): JSX.Element => {
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
        d="M1.14645 1.85355C0.951184 1.65829 0.951184 1.34171 1.14645 1.14645C1.34171 0.951184 1.65829 0.951184 1.85355 1.14645L14.8536 14.1464C15.0488 14.3417 15.0488 14.6583 14.8536 14.8536C14.6583 15.0488 14.3417 15.0488 14.1464 14.8536L1.14645 1.85355Z"
        fill={color}
      />
      <path
        d="M1.00001 7.95478C1.00171 6.58916 1.15408 5.21892 1.46464 3.58596L0.613971 2.73529C-0.272704 7.03462 -0.206308 9.67416 0.860737 14.3958C0.944331 14.7657 1.23431 15.056 1.6041 15.1401C6.2203 16.1899 8.85214 16.2872 13.2627 15.384L12.4112 14.5325C10.7281 14.8505 9.33041 15.0017 7.95478 15C6.12859 14.9977 4.29414 14.726 1.83422 14.1669C1.26498 11.6464 0.997751 9.78116 1.00001 7.95478Z"
        fill={color}
      />
      <path
        d="M14.5354 12.414L15.386 13.2647C16.2727 8.96538 16.2063 6.32584 15.1393 1.60417C15.0557 1.23427 14.7657 0.944026 14.3959 0.859926C9.77971 -0.189926 7.14786 -0.287173 2.73735 0.61603L3.58877 1.46745C5.27188 1.14949 6.66959 0.99831 8.04522 1.00001C9.87141 1.00228 11.7059 1.274 14.1658 1.83313C14.735 4.35355 15.0023 6.21885 15 8.04522C14.9983 9.41084 14.8459 10.7811 14.5354 12.414Z"
        fill={color}
      />
    </svg>
  );
};
