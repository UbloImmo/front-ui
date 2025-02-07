import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `convexe-core-2nd-half`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeCore2NdHalf = (props: CommonIconProps): JSX.Element => {
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
        d="M12.4842 12.4807C10.693 12.8399 9.31618 12.9982 8 13V3.00001L8.04274 3.00001C9.36441 3.00165 10.7233 3.16104 12.4807 3.51585C12.8438 5.32644 13.0016 6.7136 13 8.04274C12.9984 9.36441 12.839 10.7233 12.4842 12.4807Z"
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
