import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `unit-template`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const UnitTemplate = (props: CommonIconProps): JSX.Element => {
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
        d="M7.81878 3.034C7.93534 2.98867 8.06466 2.98867 8.18122 3.034L12.6812 4.784C12.8734 4.85874 13 5.04379 13 5.25V10.75C13 10.9476 12.8836 11.1267 12.7031 11.2069L8.20307 13.2069C8.07379 13.2644 7.92621 13.2644 7.79693 13.2069L3.29693 11.2069C3.11637 11.1267 3 10.9476 3 10.75V5.25C3 5.04379 3.12659 4.85874 3.31878 4.784L7.81878 3.034ZM4 5.98092L7.5 7.34203V11.9806L4 10.4251V5.98092ZM8.5 11.9806L12 10.4251V5.98092L8.5 7.34203V11.9806ZM8 6.46352L11.1205 5.25L8 4.03648L4.87951 5.25L8 6.46352Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 11V14C1 14.5523 1.44772 15 2 15H5V16H2C0.895431 16 0 15.1046 0 14V11H1ZM11 15V16H14C15.1046 16 16 15.1046 16 14V11H15V14C15 14.5523 14.5523 15 14 15H11ZM15 5H16V2C16 0.89543 15.1046 0 14 0H11V1H14C14.5523 1 15 1.44772 15 2V5ZM5 1H2C1.44772 1 1 1.44772 1 2V5H0V2C0 0.895431 0.89543 0 2 0H5V1Z"
        fill={color}
      />
    </svg>
  );
};

export default UnitTemplate;
