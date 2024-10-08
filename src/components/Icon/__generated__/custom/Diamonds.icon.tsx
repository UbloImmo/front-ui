import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `diamonds`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Diamonds = (props: CommonIconProps): JSX.Element => {
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
        d="M8.0001 2.19991L8.33935 1.86066C8.92513 1.27488 9.87488 1.27488 10.4607 1.86067L15.5518 6.95184C16.1376 7.53762 16.1376 8.48737 15.5518 9.07316L10.4607 14.1643C9.87488 14.7501 8.92513 14.7501 8.33935 14.1643L8.0001 13.8251L7.66086 14.1643C7.07508 14.7501 6.12533 14.7501 5.53954 14.1643L0.448372 9.07315C-0.137414 8.48737 -0.137413 7.53762 0.448374 6.95183L5.53954 1.86066C6.12533 1.27488 7.07508 1.27488 7.66086 1.86067L8.0001 2.19991ZM8.0001 3.61412L12.0449 7.65894C12.2402 7.8542 12.2402 8.17078 12.0449 8.36605L8.0001 12.4109L3.95528 8.36605C3.76002 8.17079 3.76002 7.8542 3.95529 7.65894L8.0001 3.61412ZM8.70721 2.90702L9.04646 2.56777C9.24172 2.37251 9.5583 2.37251 9.75356 2.56777L14.8447 7.65894C15.04 7.8542 15.04 8.17078 14.8447 8.36605L9.75356 13.4572C9.5583 13.6525 9.24172 13.6525 9.04645 13.4572L8.70721 13.118L12.752 9.07316C13.3378 8.48737 13.3378 7.53762 12.752 6.95184L8.70721 2.90702ZM7.293 13.118L6.95375 13.4572C6.75849 13.6525 6.44191 13.6525 6.24665 13.4572L1.15548 8.36605C0.960218 8.17079 0.960217 7.8542 1.15548 7.65894L6.24665 2.56777C6.44191 2.37251 6.75849 2.37251 6.95376 2.56777L7.293 2.90701L3.24818 6.95183C2.66239 7.53762 2.66239 8.48737 3.24818 9.07315L7.293 13.118Z"
        fill={color}
      />
    </svg>
  );
};
