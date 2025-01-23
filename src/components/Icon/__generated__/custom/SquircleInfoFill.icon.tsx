import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `squircle-info-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const SquircleInfoFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7.4864 0.00400009C7.6544 0.00160009 7.8256 0 8 0L8.2592 0.000799942L8.5136 0.00400009L9.0064 0.0176001C9.08615 0.0206415 9.16589 0.0241082 9.2456 0.0280001L9.7088 0.0552L10.1512 0.092C13.9792 0.4632 15.5368 2.0208 15.908 5.8488L15.9448 6.2912L15.972 6.7544L15.9824 6.9936L15.996 7.4864L16 8L15.996 8.5136L15.9824 9.0064C15.98 9.0872 15.976 9.1672 15.972 9.2456L15.9448 9.7088L15.908 10.1512C15.5368 13.9792 13.9792 15.5368 10.1512 15.908L9.7088 15.9448L9.2456 15.972L9.0064 15.9824L8.5136 15.996L8 16L7.4864 15.996L6.9936 15.9824C6.9128 15.98 6.8328 15.976 6.7544 15.972L6.2912 15.9448L5.8488 15.908C2.0208 15.5368 0.4632 13.9792 0.092 10.1512L0.0552 9.7088L0.0280001 9.2456L0.0176001 9.0064L0.00400009 8.5136C0.00160009 8.3456 0 8.1744 0 8L0.000799942 7.7408L0.00400009 7.4864L0.0176001 6.9936C0.0200001 6.9128 0.0240001 6.8328 0.0280001 6.7544L0.0552 6.2912L0.092 5.8488C0.4632 2.0208 2.0208 0.4632 5.8488 0.092L6.2912 0.0552L6.7544 0.0280001L6.9936 0.0176001L7.4864 0.00400009ZM8 5.5C8.55229 5.5 9 5.05228 9 4.5C9 3.94772 8.55229 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5C7 5.05228 7.44772 5.5 8 5.5ZM6.63969 6.875L8.9307 6.58789L7.92875 11.293C7.85844 11.6328 7.95805 11.8262 8.23344 11.8262C8.4268 11.8262 8.71977 11.7559 8.91898 11.5801L8.83109 11.9961C8.54398 12.3418 7.91117 12.5938 7.36625 12.5938C6.66313 12.5938 6.3643 12.1719 6.55766 11.2754L7.29594 7.80664C7.36039 7.51367 7.3018 7.4082 7.00883 7.33789L6.55766 7.25586L6.63969 6.875Z"
        fill={color}
      />
    </svg>
  );
};
