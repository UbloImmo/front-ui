import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `hexagon-arrow-down-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const HexagonArrowDownFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7.49998 0.133975C7.80938 -0.0446582 8.19058 -0.0446582 8.49998 0.133975L14.5 3.71132C14.8094 3.88995 15 4.22008 15 4.57734V11.4226C15 11.7799 14.8094 12.11 14.5 12.2887L8.49998 15.866C8.19058 16.0447 7.80938 16.0447 7.49998 15.866L1.5 12.2887C1.1906 12.11 1 11.7799 1 11.4226V4.57734C1 4.22008 1.1906 3.88995 1.5 3.71132L7.49998 0.133975ZM8 4C8.27614 4 8.5 4.22386 8.5 4.5V10.2929L10.6464 8.14645C10.8417 7.95118 11.1583 7.95118 11.3536 8.14645C11.5488 8.34171 11.5488 8.65829 11.3536 8.85355L8.35355 11.8536C8.15829 12.0488 7.84171 12.0488 7.64645 11.8536L4.64645 8.85355C4.45118 8.65829 4.45118 8.34171 4.64645 8.14645C4.84171 7.95118 5.15829 7.95118 5.35355 8.14645L7.5 10.2929V4.5C7.5 4.22386 7.72386 4 8 4Z"
        fill={color}
      />
    </svg>
  );
};

export default HexagonArrowDownFill;
