import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from custom icon: `slash-square-v2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const SlashSquareV2 = (props: CommonIconProps): JSX.Element => {
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
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2ZM14.259 1.03387C14.1764 1.01178 14.0896 1 14 1H2C1.44772 1 1 1.44772 1 2V14C1 14.0896 1.01178 14.1764 1.03387 14.259L14.259 1.03387ZM14.9661 1.74098L1.74098 14.9661C1.82359 14.9882 1.91042 15 2 15H14C14.5523 15 15 14.5523 15 14V2C15 1.91042 14.9882 1.82359 14.9661 1.74098Z"
        fill={color}
      />
    </svg>
  );
};
