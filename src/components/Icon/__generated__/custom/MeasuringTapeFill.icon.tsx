import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `measuring-tape-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const MeasuringTapeFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7 10C8.10457 10 9 9.10457 9 8C9 6.89543 8.10457 6 7 6C5.89543 6 5 6.89543 5 8C5 9.10457 5.89543 10 7 10Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 5C0 2.79086 1.79086 1 4 1H10C12.2091 1 14 2.79086 14 5V11C14 12.1947 13.4762 13.2671 12.6458 14H15.5C15.7761 14 16 14.2239 16 14.5V15.5C16 15.7761 15.7761 16 15.5 16C15.2239 16 15 15.7761 15 15.5V15H4C1.79086 15 0 13.2091 0 11V5ZM7 11C8.65685 11 10 9.65685 10 8C10 6.34315 8.65685 5 7 5C5.34315 5 4 6.34315 4 8C4 9.65685 5.34315 11 7 11Z"
        fill={color}
      />
    </svg>
  );
};

export default MeasuringTapeFill;
