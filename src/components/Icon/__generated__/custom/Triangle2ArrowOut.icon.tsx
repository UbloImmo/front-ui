import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-arrow-out`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2ArrowOut = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_76)" >
        <path
          d="M9.16095 0C9.36433 0 9.54817 0.123159 9.62482 0.311523L11.3807 4.63379C11.2202 4.70628 11.0692 4.80759 10.9373 4.93945C10.797 5.07987 10.6899 5.24103 10.617 5.41309L8.82501 1H7.17071L1.48321 15H14.5125L13.243 11.875L14.0106 11.1074L15.7186 15.3115C15.8521 15.6403 15.6096 16 15.2547 16H0.741027L0.675598 15.9961C0.357251 15.9553 0.152059 15.6197 0.27716 15.3115L6.37091 0.311523C6.43795 0.146658 6.58722 0.0320295 6.75958 0.00585938L6.83478 0H9.16095Z"
          fill={color}
        />
        <path
          d="M11.7576 5.5625C11.9475 5.45805 12.1904 5.48552 12.3514 5.64648L14.8514 8.14648C14.8852 8.18034 14.9113 8.21891 14.9334 8.25879C14.9579 8.303 14.9779 8.35024 14.9881 8.40137C15.0011 8.4661 15.0009 8.53291 14.9881 8.59766C14.9779 8.64882 14.9579 8.69598 14.9334 8.74023C14.9112 8.78037 14.8854 8.81947 14.8514 8.85352L12.3514 11.3535C12.1561 11.5487 11.8396 11.5487 11.6443 11.3535C11.4491 11.1583 11.4492 10.8417 11.6443 10.6465L13.2908 9H7.49786C7.22179 8.99996 6.99792 8.77607 6.99786 8.5C6.99786 8.22388 7.22176 8.00004 7.49786 8H13.2908L11.6443 6.35352C11.62 6.32912 11.5982 6.3031 11.5799 6.27539C11.546 6.22403 11.5235 6.16752 11.5106 6.10938C11.5075 6.09549 11.5056 6.08144 11.5037 6.06738C11.5013 6.04918 11.4993 6.03103 11.4988 6.0127C11.4986 6.00259 11.4985 5.99252 11.4988 5.98242C11.4995 5.9638 11.501 5.94523 11.5037 5.92676C11.5058 5.91299 11.5084 5.89933 11.5115 5.88574C11.5154 5.86912 11.5215 5.85315 11.5272 5.83691C11.5313 5.82486 11.5347 5.81255 11.5399 5.80078C11.5461 5.7864 11.5537 5.77264 11.5613 5.75879C11.5835 5.71875 11.6104 5.68046 11.6443 5.64648C11.6687 5.62211 11.6948 5.60032 11.7225 5.58203C11.7336 5.57466 11.746 5.56887 11.7576 5.5625Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_76" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2ArrowOut;
