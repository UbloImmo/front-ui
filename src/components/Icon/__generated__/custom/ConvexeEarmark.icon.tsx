import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `convexe-earmark`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ConvexeEarmark = (props: CommonIconProps): JSX.Element => {
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
        d="M11.3002 0.600138L10.9034 0.20328C7.85259 -0.208398 5.40186 0.0025019 1.60417 0.860736C1.23427 0.944331 0.944026 1.23431 0.859926 1.6041C-0.276771 6.60215 -0.296743 9.27398 0.860737 14.3958C0.944331 14.7657 1.23431 15.056 1.6041 15.1401C6.60216 16.2768 9.27398 16.2967 14.3958 15.1393C14.7657 15.0557 15.056 14.7657 15.1401 14.3959C15.9898 10.6596 16.2155 8.22331 15.7917 5.09167L15.3999 4.69979C15.3858 4.68112 15.3704 4.66329 15.3536 4.64645L11.3536 0.646448C11.3367 0.629611 11.3189 0.614164 11.3002 0.600138ZM1.83421 14.1669C4.29414 14.726 6.12859 14.9977 7.95478 15C9.78116 15.0023 11.6464 14.735 14.1669 14.1658C14.726 11.7059 14.9977 9.87141 15 8.04522C15.001 7.22341 14.9475 6.39372 14.8364 5.5H12.7255C12.1401 5.5 11.5757 5.27456 11.1573 4.86865C10.7383 4.46224 10.5 3.90774 10.5 3.32622V1.1594C9.64564 1.05363 8.84464 1.001 8.04522 1.00001C6.21885 0.997752 4.35355 1.26497 1.83313 1.83421C1.274 4.29414 1.00228 6.12859 1.00001 7.95478C0.997751 9.78116 1.26497 11.6465 1.83421 14.1669ZM11.8535 4.15087C11.6253 3.92949 11.5 3.63253 11.5 3.32622V2.20711L13.7929 4.5H12.7255C12.3956 4.5 12.0823 4.37276 11.8535 4.15087Z"
        fill={color}
      />
    </svg>
  );
};

export default ConvexeEarmark;
