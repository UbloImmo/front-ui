import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
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
        d="M7.66077 1.86067C7.07498 1.27488 6.12524 1.27488 5.53945 1.86066L0.448282 6.95183C-0.137504 7.53762 -0.137506 8.48737 0.448281 9.07315L5.53945 14.1643C6.12524 14.7501 7.07498 14.7501 7.66077 14.1643L8.00001 13.8251L8.33926 14.1643C8.92504 14.7501 9.87479 14.7501 10.4606 14.1643L15.5517 9.07316C16.1375 8.48737 16.1375 7.53762 15.5517 6.95184L10.4606 1.86067C9.87479 1.27488 8.92504 1.27488 8.33926 1.86066L8.00001 2.19991L7.66077 1.86067ZM8.70712 13.118L12.7519 9.07316C13.3377 8.48737 13.3377 7.53762 12.7519 6.95184L8.70712 2.90702L9.04636 2.56777C9.24162 2.37251 9.55821 2.37251 9.75347 2.56777L14.8446 7.65894C15.0399 7.8542 15.0399 8.17078 14.8446 8.36605L9.75347 13.4572C9.55821 13.6525 9.24163 13.6525 9.04636 13.4572L8.70712 13.118Z"
        fill={color}
      />
    </svg>
  );
};
