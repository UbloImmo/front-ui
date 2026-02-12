import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `hexagon-arrow-right`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const HexagonArrowRight = (props: CommonIconProps): JSX.Element => {
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
        d="M4 8C4 7.72386 4.22386 7.5 4.5 7.5L10.2929 7.5L8.14645 5.35355C7.95118 5.15829 7.95118 4.84171 8.14645 4.64645C8.34171 4.45118 8.65829 4.45118 8.85355 4.64645L11.8536 7.64645C12.0488 7.84171 12.0488 8.15829 11.8536 8.35355L8.85355 11.3536C8.65829 11.5488 8.34171 11.5488 8.14645 11.3536C7.95118 11.1583 7.95118 10.8417 8.14645 10.6464L10.2929 8.5H4.5C4.22386 8.5 4 8.27614 4 8Z"
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

export default HexagonArrowRight;
