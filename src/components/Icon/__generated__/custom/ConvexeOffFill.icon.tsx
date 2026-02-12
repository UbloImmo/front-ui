import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `convexe-off-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ConvexeOffFill = (props: CommonIconProps): JSX.Element => {
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
        d="M15.1393 1.60417C16.2063 6.32585 16.2727 8.96538 15.386 13.2647L2.73735 0.61603C7.14786 -0.287173 9.77971 -0.189926 14.3959 0.859926C14.7657 0.944026 15.0557 1.23427 15.1393 1.60417Z"
        fill={color}
      />
      <path
        d="M0.860737 14.3958C-0.206308 9.67416 -0.272704 7.03462 0.613971 2.73529L13.2627 15.384C8.85214 16.2872 6.2203 16.1899 1.6041 15.1401C1.23431 15.056 0.944331 14.7657 0.860737 14.3958Z"
        fill={color}
      />
      <path
        d="M14.8536 14.1464L1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464Z"
        fill={color}
      />
    </svg>
  );
};

export default ConvexeOffFill;
