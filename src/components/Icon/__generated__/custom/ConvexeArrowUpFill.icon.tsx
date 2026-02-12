import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `convexe-arrow-up-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ConvexeArrowUpFill = (props: CommonIconProps): JSX.Element => {
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
        d="M1.60417 0.860737C6.72602 -0.296743 9.39785 -0.276771 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417C16.2967 6.72602 16.2768 9.39785 15.1401 14.3959C15.056 14.7657 14.7657 15.0557 14.3958 15.1393C9.27398 16.2967 6.60215 16.2768 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958C-0.296743 9.27398 -0.276771 6.60215 0.859927 1.6041C0.944027 1.23431 1.23427 0.944331 1.60417 0.860737ZM8 12C7.72386 12 7.5 11.7761 7.5 11.5V5.70711L5.35355 7.85355C5.15829 8.04882 4.84171 8.04882 4.64645 7.85355C4.45118 7.65829 4.45118 7.34171 4.64645 7.14645L7.64645 4.14645C7.84171 3.95118 8.15829 3.95118 8.35355 4.14645L11.3536 7.14645C11.5488 7.34171 11.5488 7.65829 11.3536 7.85355C11.1583 8.04882 10.8417 8.04882 10.6464 7.85355L8.5 5.70711V11.5C8.5 11.7761 8.27614 12 8 12Z"
        fill={color}
      />
    </svg>
  );
};

export default ConvexeArrowUpFill;
