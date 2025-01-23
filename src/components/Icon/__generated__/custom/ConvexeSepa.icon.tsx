import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `convexe-sepa`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ConvexeSepa = (props: CommonIconProps): JSX.Element => {
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
        d="M9.16352 4.88665C10.1064 4.88665 10.95 5.32451 11.5028 6.01021L11.5071 6.0157L12 4.94453C11.2244 4.20472 10.1761 3.75 9.02274 3.75C7.24158 3.75 5.71082 4.83448 5.04047 6.38631L5.02957 6.41462H4.07559L3.5 7.65952H4.74019V8.00372C4.74074 8.1454 4.74816 8.28467 4.76214 8.42192H4.12649L3.55726 9.65718H5.06457C5.74872 11.1971 7.25166 12.25 8.99772 12.25L9.02167 12.25L9.03603 12.25C9.92919 12.25 10.7594 11.9773 11.4497 11.5097L11.434 11.5197V10.0078C10.8786 10.6477 10.0682 11.0495 9.16509 11.0495C8.1118 11.0495 7.18468 10.503 6.64567 9.67509L6.63864 9.66362H9.79631L10.3655 8.42837H6.17115C6.15057 8.29357 6.13882 8.13807 6.13882 7.9798C6.13882 7.86702 6.1448 7.75561 6.15643 7.64595L6.15526 7.65955H10.7153L11.2909 6.41463H6.54954C7.08049 5.49412 8.05147 4.88501 9.16321 4.88343L9.16352 4.88665Z"
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
