import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `prorata-calendar-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const ProrataCalendarFill = (props: CommonIconProps): JSX.Element => {
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
        d="M16 14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V5H16V14ZM11.3535 7.14648C11.1583 6.95122 10.8417 6.95122 10.6465 7.14648L4.64648 13.1465C4.45122 13.3417 4.45122 13.6583 4.64648 13.8535C4.84175 14.0488 5.15825 14.0488 5.35352 13.8535L11.3535 7.85352C11.5488 7.65825 11.5488 7.34175 11.3535 7.14648ZM10.5 12C9.94771 12 9.5 12.4477 9.5 13C9.5 13.5523 9.94771 14 10.5 14C11.0523 14 11.5 13.5523 11.5 13C11.5 12.4477 11.0523 12 10.5 12ZM5.5 7C4.94772 7 4.5 7.44772 4.5 8C4.5 8.55229 4.94772 9 5.5 9C6.05228 9 6.5 8.55229 6.5 8C6.5 7.44772 6.05228 7 5.5 7ZM12.5 0C12.7761 0 13 0.223858 13 0.5V1H14C15.1046 1 16 1.89543 16 3V4H0V3C0 1.89543 0.895431 1 2 1H3V0.5C3 0.223858 3.22386 0 3.5 0C3.77614 0 4 0.223858 4 0.5V1H12V0.5C12 0.223858 12.2239 0 12.5 0Z"
        fill={color}
      />
    </svg>
  );
};

export default ProrataCalendarFill;
