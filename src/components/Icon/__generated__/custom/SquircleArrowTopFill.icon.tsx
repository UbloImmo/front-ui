import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `squircle-arrow-top-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const SquircleArrowTopFill = (props: CommonIconProps): JSX.Element => {
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
        d="M8.5136 15.996C8.3456 15.9984 8.1744 16 8 16L7.7408 15.9992L7.4864 15.996L6.9936 15.9824C6.91385 15.9794 6.83411 15.9759 6.7544 15.972L6.2912 15.9448L5.8488 15.908C2.0208 15.5368 0.463199 13.9792 0.0919998 10.1512L0.0551995 9.7088L0.0279998 9.2456L0.017599 9.0064L0.00399871 8.5136L0 8L0.0039988 7.4864L0.0175992 6.9936C0.0199992 6.9128 0.024 6.8328 0.028 6.7544L0.0551998 6.2912L0.0920002 5.8488C0.463201 2.0208 2.0208 0.463199 5.8488 0.0919998L6.2912 0.0551995L6.7544 0.0279998L6.9936 0.017599L7.4864 0.00399871L8 0L8.5136 0.0039988L9.0064 0.0175992C9.0872 0.0199992 9.1672 0.024 9.2456 0.028L9.7088 0.0551998L10.1512 0.0920002C13.9792 0.463201 15.5368 2.0208 15.908 5.8488L15.9448 6.2912L15.972 6.7544L15.9824 6.9936L15.996 7.4864C15.9984 7.6544 16 7.8256 16 8L15.9992 8.2592L15.996 8.5136L15.9824 9.0064C15.98 9.0872 15.976 9.1672 15.972 9.2456L15.9448 9.7088L15.908 10.1512C15.5368 13.9792 13.9792 15.5368 10.1512 15.908L9.7088 15.9448L9.2456 15.972L9.0064 15.9824L8.5136 15.996ZM8.5 11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5L7.5 5.70711L5.35355 7.85355C5.15829 8.04882 4.84171 8.04882 4.64645 7.85355C4.45118 7.65829 4.45118 7.34171 4.64645 7.14645L7.64645 4.14645C7.84171 3.95118 8.15829 3.95118 8.35355 4.14645L11.3536 7.14645C11.5488 7.34171 11.5488 7.65829 11.3536 7.85355C11.1583 8.04882 10.8417 8.04882 10.6464 7.85355L8.5 5.70711L8.5 11.5Z"
        fill={color}
      />
    </svg>
  );
};

export default SquircleArrowTopFill;
