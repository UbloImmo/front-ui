import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `diamonds-layers-2`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const DiamondsLayers2 = (props: CommonIconProps): JSX.Element => {
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
        d="M7.66074 1.86067C7.07495 1.27488 6.12521 1.27488 5.53942 1.86066L0.448252 6.95183C-0.137535 7.53762 -0.137536 8.48737 0.44825 9.07315L5.53942 14.1643C6.12521 14.7501 7.07495 14.7501 7.66074 14.1643L7.99998 13.8251L8.33922 14.1643C8.92501 14.7501 9.87476 14.7501 10.4605 14.1643L15.5517 9.07316C16.1375 8.48737 16.1375 7.53762 15.5517 6.95184L10.4605 1.86067C9.87476 1.27488 8.92501 1.27488 8.33923 1.86066L7.99998 2.19991L7.66074 1.86067ZM8.70709 13.118L12.7519 9.07316C13.3377 8.48737 13.3377 7.53762 12.7519 6.95184L8.70709 2.90702L9.04633 2.56777C9.24159 2.37251 9.55818 2.37251 9.75344 2.56777L14.8446 7.65894C15.0399 7.8542 15.0399 8.17078 14.8446 8.36605L9.75344 13.4572C9.55818 13.6525 9.2416 13.6525 9.04633 13.4572L8.70709 13.118Z"
        fill={color}
      />
    </svg>
  );
};
