import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `trash3-off-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Trash3OffFill = (props: CommonIconProps): JSX.Element => {
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
        d="M13.9618 3.5L13.344 11.2225L11.2585 9.13706L11.5002 5.02936C11.5164 4.75369 11.306 4.51708 11.0304 4.50086C10.7547 4.48465 10.5181 4.69497 10.5019 4.97064L10.3125 8.19098L8.50016 6.37868V5C8.50016 4.72386 8.2763 4.5 8.00015 4.5C7.72401 4.5 7.50015 4.72386 7.50015 5V5.37868L4.62147 2.5H5.00015V1.5C5.00015 0.671573 5.67173 0 6.50015 0H9.50015C10.3286 0 11.0002 0.671573 11.0002 1.5V2.5H14.5002C14.7763 2.5 15.0002 2.72386 15.0002 3C15.0002 3.27614 14.7763 3.5 14.5002 3.5H13.9618ZM6.00015 1.5V2.5H10.0002V1.5C10.0002 1.22386 9.77629 1 9.50015 1H6.50015C6.22401 1 6.00015 1.22386 6.00015 1.5Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.8536 14.1464C15.0488 14.3417 15.0488 14.6583 14.8536 14.8536C14.6583 15.0488 14.3417 15.0488 14.1464 14.8536L1.14645 1.85355C0.951184 1.65829 0.951184 1.34171 1.14645 1.14645C1.34171 0.951184 1.65829 0.951184 1.85355 1.14645L14.8536 14.1464ZM5.34572 4.63861C5.35059 4.64329 5.35538 4.64808 5.36006 4.65295L5.34572 4.63861Z"
        fill={color}
      />
      <path
        d="M10.0019 13.4706L10.0768 12.1979L8.50016 10.6213V13.5C8.50016 13.7761 8.2763 14 8.00015 14C7.72401 14 7.50015 13.7761 7.50015 13.5V9.62132L5.66403 7.7852L5.99841 13.4698C6.01463 13.7454 5.8043 13.9821 5.52864 13.9983C5.25297 14.0145 5.01636 13.8042 5.00014 13.5285L4.59969 6.72086L2.09592 4.21709L2.89131 14.1595C2.97447 15.1989 3.84222 16 4.88494 16H11.1154C11.8596 16 12.5148 15.5919 12.8591 14.9802L11.0228 13.144L11.0002 13.5294C10.9839 13.805 10.7473 14.0154 10.4717 13.9991C10.196 13.9829 9.98567 13.7463 10.0019 13.4706Z"
        fill={color}
      />
      <path
        d="M1.35848 3.47964C1.19625 3.4318 1.06835 3.3039 1.02051 3.14168L1.35848 3.47964Z"
        fill={color}
      />
    </svg>
  );
};
