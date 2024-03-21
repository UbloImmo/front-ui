import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from bootstrap icon: `cloud-sleet-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const CloudSleetFill = (props: CommonIconProps): JSX.Element => {
  const { color, size } = useMemo(() => {
    const mergedProps = mergeDefaultProps(commonIconDefaulProps, props);
    return {
      color: cssVarUsage(mergedProps.color),
      size: cssLengthUsage(mergedProps.size),
    };
  }, [props]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 16 16"
      data-testid="icon"
    >
      <path d="M2.375 13.5a.25.25 0 0 1 .25.25v.57l.501-.287a.25.25 0 0 1 .248.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 0 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zM6.375 13.5a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 1 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 0 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm2.151 2.447a.25.25 0 0 1 .25.25v.57l.5-.287a.25.25 0 0 1 .249.434l-.495.283.495.283a.25.25 0 1 1-.248.434l-.501-.286v.569a.25.25 0 0 1-.5 0v-.57l-.501.287a.25.25 0 1 1-.248-.434l.495-.283-.495-.283a.25.25 0 1 1 .248-.434l.501.286v-.569a.25.25 0 0 1 .25-.25m1.849-2.447a.5.5 0 0 1 .223.67l-.5 1a.5.5 0 1 1-.894-.447l.5-1a.5.5 0 0 1 .67-.223zm1.181-7.026a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973" />
    </svg>
  );
};
