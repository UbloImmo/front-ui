import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-x`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeX = (props: CommonIconProps): JSX.Element => {
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
        d="M1.83313 1.83421C1.274 4.29414 1.00228 6.12859 1.00001 7.95478C0.997751 9.78116 1.26498 11.6464 1.83422 14.1669C4.29414 14.726 6.12859 14.9977 7.95478 15C9.78116 15.0023 11.6464 14.735 14.1669 14.1658C14.726 11.7059 14.9977 9.87141 15 8.04522C15.0023 6.21885 14.735 4.35355 14.1658 1.83313C11.7059 1.274 9.87141 1.00228 8.04522 1.00001C6.21885 0.997751 4.35355 1.26497 1.83313 1.83421ZM1.60417 0.860737C6.72602 -0.296743 9.39785 -0.276771 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417C16.2967 6.72602 16.2768 9.39785 15.1401 14.3959C15.056 14.7657 14.7657 15.0557 14.3958 15.1393C9.27398 16.2967 6.60215 16.2768 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958C-0.296743 9.27398 -0.276771 6.60215 0.859927 1.6041C0.944027 1.23431 1.23427 0.944331 1.60417 0.860737Z"
        fill={color}
      />
      <path
        d="M10.3536 6.35355C10.5488 6.15829 10.5488 5.84171 10.3536 5.64645C10.1583 5.45119 9.84171 5.45119 9.64645 5.64645L8 7.29289L6.35355 5.64645C6.15829 5.45119 5.84171 5.45119 5.64645 5.64645C5.45119 5.84171 5.45119 6.15829 5.64645 6.35355L7.29289 8L5.64645 9.64645C5.45119 9.84171 5.45119 10.1583 5.64645 10.3536C5.84171 10.5488 6.15829 10.5488 6.35355 10.3536L8 8.70711L9.64645 10.3536C9.84171 10.5488 10.1583 10.5488 10.3536 10.3536C10.5488 10.1583 10.5488 9.84171 10.3536 9.64645L8.70711 8L10.3536 6.35355Z"
        fill={color}
      />
    </svg>
  );
};
