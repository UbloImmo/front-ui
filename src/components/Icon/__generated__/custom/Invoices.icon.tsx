import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `invoices`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Invoices = (props: CommonIconProps): JSX.Element => {
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
        d="M3.62376 0.790441C4.02314 0.391058 4.56482 0.166687 5.12963 0.166687H13.2778C13.8426 0.166687 14.3843 0.391058 14.7837 0.790441C15.1831 1.18982 15.4074 1.7315 15.4074 2.29632L15.4074 11.5C15.4074 11.6251 15.3605 11.7457 15.276 11.8379C14.9348 12.21 14.4645 12.8 13.9559 13.4379L13.7239 13.7287C13.1411 14.4584 12.5254 15.2187 12.0572 15.6869C11.9634 15.7807 11.8362 15.8334 11.7036 15.8334L5.12967 15.8334C4.56486 15.8334 4.02318 15.609 3.62379 15.2096C3.22441 14.8102 3.00004 14.2685 3.00004 13.7037L3 2.29632C3 1.7315 3.22437 1.18982 3.62376 0.790441ZM5.12963 1.16669C4.83004 1.16669 4.54271 1.2857 4.33086 1.49755C4.11901 1.7094 4 1.99672 4 2.29632L4.00004 13.7037C4.00004 14.0033 4.11905 14.2906 4.3309 14.5025C4.54275 14.7143 4.83007 14.8334 5.12967 14.8334L10.5925 14.8334V12.8519C10.5925 12.287 10.8169 11.7454 11.2163 11.346C11.6157 10.9466 12.1573 10.7222 12.7222 10.7222H14.4074L14.4074 2.29632C14.4074 1.99672 14.2884 1.7094 14.0766 1.49755C13.8647 1.2857 13.5774 1.16669 13.2778 1.16669H5.12963ZM12.9426 13.1046C12.4566 13.7131 11.9802 14.301 11.5925 14.725V12.8519C11.5925 12.5523 11.7115 12.2649 11.9234 12.0531C12.1352 11.8412 12.4226 11.7222 12.7222 11.7222H14.0553C13.7821 12.0516 13.4786 12.4323 13.1722 12.8167L12.9426 13.1046Z"
        fill={color}
      />
      <path
        d="M2.81482 0.190063C2.29173 0.764909 2 1.51557 2 2.2963L2.00004 13.7037C2.00004 14.4845 2.29177 15.2351 2.81485 15.81C2.36652 15.7429 1.94821 15.534 1.62379 15.2096C1.22441 14.8102 1.00004 14.2685 1.00004 13.7037L1 2.2963C1 1.73149 1.22437 1.18981 1.62376 0.790428C1.94818 0.46601 2.36649 0.25707 2.81482 0.190063Z"
        fill={color}
      />
    </svg>
  );
};
