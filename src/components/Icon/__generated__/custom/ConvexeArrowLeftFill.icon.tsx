import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `convexe-arrow-left-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ConvexeArrowLeftFill = (props: CommonIconProps): JSX.Element => {
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
        d="M1.60417 0.860737C6.72602 -0.296743 9.39785 -0.276771 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417C16.2967 6.72602 16.2768 9.39785 15.1401 14.3959C15.056 14.7657 14.7657 15.0557 14.3958 15.1393C9.27398 16.2967 6.60215 16.2768 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958C-0.296743 9.27398 -0.276771 6.60215 0.859927 1.6041C0.944027 1.23431 1.23427 0.944331 1.60417 0.860737ZM12 8C12 7.72386 11.7761 7.5 11.5 7.5H5.70711L7.85355 5.35355C8.04882 5.15829 8.04882 4.84171 7.85355 4.64645C7.65829 4.45118 7.34171 4.45118 7.14645 4.64645L4.14645 7.64645C3.95118 7.84171 3.95118 8.15829 4.14645 8.35355L7.14645 11.3536C7.34171 11.5488 7.65829 11.5488 7.85355 11.3536C8.04882 11.1583 8.04882 10.8417 7.85355 10.6464L5.70711 8.5H11.5C11.7761 8.5 12 8.27614 12 8Z"
        fill={color}
      />
    </svg>
  );
};

export default ConvexeArrowLeftFill;
