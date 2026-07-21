import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `send-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const SendOff = (props: CommonIconProps): JSX.Element => {
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
        d="M4.36971 5.49087L1.59142 6.60218L5.93024 9.36289L7.0855 8.20666L7.79252 8.91368L6.63726 10.0699L9.39797 14.4087L10.5093 11.6304L11.2788 12.4L10.146 15.2329C9.919 15.8 9.14518 15.872 8.81693 15.357L5.63825 10.3629L0.643191 7.18421C0.127862 6.85612 0.200183 6.08228 0.767213 5.85512L3.60019 4.72134L4.36971 5.49087Z"
        fill={color}
      />
      <path
        d="M1.64611 0.646196C1.84126 0.45104 2.15785 0.451248 2.35313 0.646196L15.353 13.646C15.5482 13.8413 15.5482 14.1578 15.353 14.3531C15.1577 14.5483 14.8412 14.5483 14.646 14.3531L1.64611 1.35322C1.45117 1.15795 1.45099 0.841355 1.64611 0.646196Z"
        fill={color}
      />
      <path
        d="M15.3149 0.0358517C15.5005 -0.0380738 15.7127 0.00591173 15.854 0.147179C15.9949 0.288608 16.0385 0.50082 15.9643 0.686235L12.4907 9.36973L11.7212 8.60021L14.1313 2.57684L9.91359 6.79261L9.20657 6.08559L13.4243 1.86982L7.39995 4.27897L6.63043 3.50944L15.3149 0.0358517Z"
        fill={color}
      />
    </svg>
  );
};

export default SendOff;
