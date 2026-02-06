import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `hexagon-core`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const HexagonCore = (props: CommonIconProps): JSX.Element => {
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
        d="M7.68748 3.08373C7.88086 2.97209 8.1191 2.97209 8.31248 3.08373L12.0625 5.31957C12.2559 5.43121 12.375 5.63754 12.375 5.86083V10.1391C12.375 10.3624 12.2559 10.5688 12.0625 10.6804L8.31248 12.9162C8.1191 13.0279 7.88086 13.0279 7.68748 12.9162L3.9375 10.6804C3.74412 10.5688 3.625 10.3624 3.625 10.1391V5.86083C3.625 5.63754 3.74412 5.43121 3.9375 5.31957L7.68748 3.08373Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.49998 0.133975C7.80938 -0.0446582 8.19058 -0.0446582 8.49998 0.133975L14.5 3.71132C14.8094 3.88995 15 4.22008 15 4.57734V11.4226C15 11.7799 14.8094 12.11 14.5 12.2887L8.49998 15.866C8.19058 16.0447 7.80938 16.0447 7.49998 15.866L1.5 12.2887C1.1906 12.11 1 11.7799 1 11.4226V4.57734C1 4.22008 1.1906 3.88995 1.5 3.71132L7.49998 0.133975ZM14 11.4226V4.57734L7.99998 1L2 4.57734V11.4226L7.99998 15L14 11.4226Z"
        fill={color}
      />
    </svg>
  );
};

export default HexagonCore;
