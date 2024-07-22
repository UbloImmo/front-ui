import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `back-arrow`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const BackArrow = (props: CommonIconProps): JSX.Element => {
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
        d="M6.64645 3.64645C6.84171 3.45118 7.1583 3.45118 7.35356 3.64645L10.5355 6.82843C10.7308 7.02369 10.7308 7.34027 10.5355 7.53553C10.3403 7.7308 10.0237 7.7308 9.82843 7.53553L7.5 5.20711V9.5C7.5 10.3284 8.17158 11 9 11H12.5C12.7761 11 13 11.2239 13 11.5C13 11.7761 12.7761 12 12.5 12H9C7.61929 12 6.5 10.8807 6.5 9.5V5.20711L4.17158 7.53553C3.97631 7.7308 3.65973 7.7308 3.46447 7.53553C3.26921 7.34027 3.26921 7.02369 3.46447 6.82843L6.64645 3.64645Z"
        fill={color}
      />
    </svg>
  );
};
