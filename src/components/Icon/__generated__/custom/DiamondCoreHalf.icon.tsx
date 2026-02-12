import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `diamond-core-half`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const DiamondCoreHalf = (props: CommonIconProps): JSX.Element => {
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
        d="M7.99999 12.7929C7.87205 12.7929 7.74411 12.744 7.64648 12.6464L3.35357 8.3535C3.15834 8.15824 3.15834 7.84173 3.35357 7.64648L7.64648 3.35357C7.74411 3.25598 7.87205 3.20708 7.99999 3.20709V12.7929Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.9502 0.434672C7.52976 -0.144891 8.47021 -0.14489 9.04978 0.434672L15.5653 6.9502C16.1449 7.52976 16.1449 8.47021 15.5653 9.04978L9.04978 15.5653C8.47021 16.1449 7.52976 16.1449 6.9502 15.5653L0.434672 9.04978C-0.144891 8.47021 -0.14489 7.52976 0.434672 6.9502L6.9502 0.434672ZM8.34959 1.13486C8.1564 0.941669 7.84357 0.94167 7.65038 1.13486L1.13486 7.65038C0.941669 7.84357 0.941669 8.1564 1.13486 8.34959L7.65038 14.8651C7.84357 15.0583 8.1564 15.0583 8.34959 14.8651L14.8651 8.34959C15.0583 8.1564 15.0583 7.84357 14.8651 7.65038L8.34959 1.13486Z"
        fill={color}
      />
    </svg>
  );
};

export default DiamondCoreHalf;
