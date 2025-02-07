import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `trash3-off`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Trash3Off = (props: CommonIconProps): JSX.Element => {
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
        d="M13.9618 3.5L13.344 11.2225L12.4151 10.2936L12.9586 3.5H5.62147L4.62147 2.5H5.00015V1.5C5.00015 0.671573 5.67173 0 6.50015 0H9.50015C10.3286 0 11.0002 0.671573 11.0002 1.5V2.5H14.5002C14.7763 2.5 15.0002 2.72386 15.0002 3C15.0002 3.27614 14.7763 3.5 14.5002 3.5H13.9618ZM6.50015 1H9.50015C9.77629 1 10.0002 1.22386 10.0002 1.5V2.5H6.00015V1.5C6.00015 1.22386 6.22401 1 6.50015 1Z"
        fill={color}
      />
      <path
        d="M10.9993 5.02936L10.7855 8.66401L9.83941 7.71794L10.001 4.97064C10.0172 4.69497 10.2538 4.48465 10.5295 4.50086C10.8052 4.51708 11.0155 4.7537 10.9993 5.02936Z"
        fill={color}
      />
      <path
        d="M5.26557 4.55831C5.26553 4.55833 5.2656 4.55829 5.26557 4.55831L1.85355 1.14645C1.65829 0.951184 1.34171 0.951184 1.14645 1.14645C0.951184 1.34171 0.951184 1.65829 1.14645 1.85355L14.1464 14.8536C14.3417 15.0488 14.6583 15.0488 14.8536 14.8536C15.0488 14.6583 15.0488 14.3417 14.8536 14.1464L5.26557 4.55831Z"
        fill={color}
      />
      <path
        d="M8.50015 5V6.37868L7.50015 5.37868V5C7.50015 4.72386 7.72401 4.5 8.00015 4.5C8.27629 4.5 8.50015 4.72386 8.50015 5Z"
        fill={color}
      />
      <path
        d="M2.09592 4.21709L3.18635 5.30752L3.88813 14.0797C3.92971 14.5994 4.36358 15 4.88494 15H11.1154C11.591 15 11.9938 14.6666 12.0924 14.2136L12.8591 14.9802C12.5148 15.5919 11.8596 16 11.1154 16H4.88494C3.84222 16 2.97447 15.1989 2.89131 14.1595L2.09592 4.21709Z"
        fill={color}
      />
      <path
        d="M9.60371 11.7249L10.5498 12.671L10.4993 13.5294C10.4831 13.805 10.2465 14.0154 9.97079 13.9991C9.69513 13.9829 9.4848 13.7463 9.50101 13.4706L9.60371 11.7249Z"
        fill={color}
      />
      <path
        d="M7.50015 13.5V9.62132L8.50015 10.6213V13.5C8.50015 13.7761 8.27629 14 8.00015 14C7.72401 14 7.50015 13.7761 7.50015 13.5Z"
        fill={color}
      />
      <path
        d="M5.13182 7.25299L6.19615 8.31732L6.49929 13.4706C6.5155 13.7463 6.30518 13.9829 6.02951 13.9991C5.75385 14.0154 5.51723 13.805 5.50101 13.5294L5.13182 7.25299Z"
        fill={color}
      />
      <path
        d="M1.35848 3.47964L1.02051 3.14168C1.06835 3.3039 1.19625 3.4318 1.35848 3.47964Z"
        fill={color}
      />
    </svg>
  );
};
