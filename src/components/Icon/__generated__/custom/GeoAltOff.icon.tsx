import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `geo-alt-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const GeoAltOff = (props: CommonIconProps): JSX.Element => {
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
        d="M14 6C14 7.40011 13.3679 8.94481 12.5141 10.3927L11.7823 9.66098C11.9184 9.42156 12.0468 9.18074 12.1658 8.93977C12.6952 7.86708 13 6.86191 13 6C13 3.23858 10.7614 1 8 1C6.65014 1 5.42522 1.53491 4.52564 2.40432L3.81845 1.69713C4.89907 0.646792 6.374 0 8 0C11.3137 0 14 2.68629 14 6Z"
        fill={color}
      />
      <path
        d="M11 6C11 6.79757 10.6888 7.52244 10.1811 8.0598L9.47358 7.35226C9.80046 6.99624 10 6.52142 10 6C10 4.89543 9.10457 4 8 4C7.47858 4 7.00376 4.19954 6.64774 4.52642L5.9402 3.81888C6.47756 3.31124 7.20243 3 8 3C9.65685 3 11 4.34315 11 6Z"
        fill={color}
      />
      <path
        d="M1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464L1.85355 1.14645Z"
        fill={color}
      />
      <path
        d="M3 6C3 5.72319 3.02249 5.45164 3.06575 5.18707L2.2295 4.35082C2.08003 4.87479 2 5.42805 2 6C2 10.3137 8 16 8 16C8 16 9.35685 14.7141 10.7801 12.9014L10.0677 12.189C9.38967 13.0602 8.71968 13.8139 8.20768 14.3605C8.13503 14.438 8.06566 14.5113 8 14.5801C7.93434 14.5113 7.86497 14.438 7.79232 14.3605C7.24558 13.7768 6.51868 12.957 5.79425 12.01C5.06754 11.0601 4.35825 10.0015 3.83423 8.93977C3.3048 7.86708 3 6.86191 3 6Z"
        fill={color}
      />
      <path
        d="M5.43437 7.55569C5.6849 7.96798 6.03202 8.3151 6.44431 8.56563L5.43437 7.55569Z"
        fill={color}
      />
    </svg>
  );
};

export default GeoAltOff;
