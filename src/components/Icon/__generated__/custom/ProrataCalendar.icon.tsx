import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from custom icon: `prorata-calendar`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ProrataCalendar = (props: CommonIconProps): JSX.Element => {
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
    >
      <path
        d="M3.5 0C3.77614 0 4 0.223858 4 0.5V1H12V0.5C12 0.223858 12.2239 0 12.5 0C12.7761 0 13 0.223858 13 0.5V1H14C15.1046 1 16 1.89543 16 3V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V3C0 1.89543 0.895431 1 2 1H3V0.5C3 0.223858 3.22386 0 3.5 0ZM1 4V14C1 14.5523 1.44772 15 2 15H14C14.5523 15 15 14.5523 15 14V4H1Z"
        fill={color}
      />
      <path
        d="M11.3536 6.14645C11.5488 6.34171 11.5488 6.65829 11.3536 6.85355L5.35355 12.8536C5.15829 13.0488 4.84171 13.0488 4.64645 12.8536C4.45118 12.6583 4.45118 12.3417 4.64645 12.1464L10.6464 6.14645C10.8417 5.95118 11.1583 5.95118 11.3536 6.14645Z"
        fill={color}
      />
      <circle cx="5.5" cy="7" r="1" fill={color} />
      <circle cx="10.5" cy="12" r="1" fill={color} />
    </svg>
  );
};
