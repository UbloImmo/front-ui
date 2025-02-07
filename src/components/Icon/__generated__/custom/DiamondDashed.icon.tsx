import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `diamond-dashed`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const DiamondDashed = (props: CommonIconProps): JSX.Element => {
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
        d="M8.87166 1.20517C8.6664 0.999909 8.3336 0.999909 8.12833 1.20517L7.26294 2.07057L6.51961 1.32724L7.385 0.461845C8.0008 -0.153948 8.99919 -0.153949 9.61499 0.461845L10.4804 1.32724L9.73705 2.07057L8.87166 1.20517ZM13.1986 5.53215L11.4678 3.80136L12.2112 3.05803L13.942 4.78882L13.1986 5.53215ZM15.7948 8.12833L14.9294 7.26294L15.6728 6.51961L16.5381 7.385C17.1539 8.0008 17.1539 8.99919 16.5381 9.61499L15.6728 10.4804L14.9294 9.73705L15.7948 8.87166C16.0001 8.6664 16.0001 8.3336 15.7948 8.12833ZM5.53215 3.80136L3.80136 5.53215L3.05803 4.78882L4.78882 3.05803L5.53215 3.80136ZM11.4678 13.1986L13.1986 11.4678L13.942 12.2112L12.2112 13.942L11.4678 13.1986ZM2.07057 7.26294L1.20517 8.12833C0.999909 8.3336 0.999909 8.6664 1.20517 8.87166L2.07057 9.73705L1.32724 10.4804L0.461845 9.61499C-0.153948 8.9992 -0.153949 8.0008 0.461845 7.385L1.32724 6.51961L2.07057 7.26294ZM8.87166 15.7948L9.73705 14.9294L10.4804 15.6728L9.61499 16.5381C8.9992 17.1539 8.0008 17.1539 7.385 16.5381L6.51961 15.6728L7.26294 14.9294L8.12833 15.7948C8.3336 16.0001 8.6664 16.0001 8.87166 15.7948ZM3.80136 11.4678L5.53215 13.1986L4.78882 13.942L3.05803 12.2112L3.80136 11.4678Z"
        fill={color}
      />
    </svg>
  );
};
