import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `diamond-corner`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const DiamondCorner = (props: CommonIconProps): JSX.Element => {
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
      viewBox="0 0 17 17"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      data-testid="icon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.87166 1.20517C8.6664 0.999909 8.3336 0.999909 8.12833 1.20517L6.15029 3.18322L5.40696 2.43989L7.385 0.461845C8.0008 -0.153948 8.99919 -0.153949 9.61499 0.461845L11.593 2.43989L10.8497 3.18322L8.87166 1.20517ZM15.7948 8.12833L13.8168 6.15029L14.5601 5.40696L16.5381 7.385C17.1539 8.0008 17.1539 8.99919 16.5381 9.61499L14.5601 11.593L13.8168 10.8497L15.7948 8.87166C16.0001 8.6664 16.0001 8.3336 15.7948 8.12833ZM3.18322 6.15029L1.20517 8.12833C0.999909 8.3336 0.999909 8.6664 1.20517 8.87166L3.18322 10.8497L2.43989 11.593L0.461845 9.61499C-0.153948 8.9992 -0.153949 8.0008 0.461845 7.385L2.43989 5.40696L3.18322 6.15029ZM8.87166 15.7948L10.8497 13.8168L11.593 14.5601L9.61499 16.5381C8.9992 17.1539 8.0008 17.1539 7.385 16.5381L5.40696 14.5601L6.15029 13.8168L8.12833 15.7948C8.3336 16.0001 8.6664 16.0001 8.87166 15.7948Z"
        fill={color}
      />
    </svg>
  );
};
