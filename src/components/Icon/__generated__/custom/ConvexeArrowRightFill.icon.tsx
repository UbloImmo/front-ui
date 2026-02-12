import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `convexe-arrow-right-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ConvexeArrowRightFill = (props: CommonIconProps): JSX.Element => {
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
        d="M1.60417 0.860737C6.72602 -0.296743 9.39785 -0.276771 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417C16.2967 6.72602 16.2768 9.39785 15.1401 14.3959C15.056 14.7657 14.7657 15.0557 14.3958 15.1393C9.27398 16.2967 6.60215 16.2768 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958C-0.296743 9.27398 -0.276771 6.60215 0.859927 1.6041C0.944027 1.23431 1.23427 0.944331 1.60417 0.860737ZM4 8C4 7.72386 4.22386 7.5 4.5 7.5H10.2929L8.14645 5.35355C7.95118 5.15829 7.95118 4.84171 8.14645 4.64645C8.34171 4.45118 8.65829 4.45118 8.85355 4.64645L11.8536 7.64645C12.0488 7.84171 12.0488 8.15829 11.8536 8.35355L8.85355 11.3536C8.65829 11.5488 8.34171 11.5488 8.14645 11.3536C7.95118 11.1583 7.95118 10.8417 8.14645 10.6464L10.2929 8.5H4.5C4.22386 8.5 4 8.27614 4 8Z"
        fill={color}
      />
    </svg>
  );
};

export default ConvexeArrowRightFill;
