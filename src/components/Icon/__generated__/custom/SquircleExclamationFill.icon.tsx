import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `squircle-exclamation-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const SquircleExclamationFill = (props: CommonIconProps): JSX.Element => {
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
        d="M7.4864 0.00400009C7.6544 0.00160009 7.8256 0 8 0L8.2592 0.000799942L8.5136 0.00400009L9.0064 0.0176001C9.08615 0.0206415 9.16589 0.0241082 9.2456 0.0280001L9.7088 0.0552L10.1512 0.092C13.9792 0.4632 15.5368 2.0208 15.908 5.8488L15.9448 6.2912L15.972 6.7544L15.9824 6.9936L15.996 7.4864L16 8L15.996 8.5136L15.9824 9.0064C15.98 9.0872 15.976 9.1672 15.972 9.2456L15.9448 9.7088L15.908 10.1512C15.5368 13.9792 13.9792 15.5368 10.1512 15.908L9.7088 15.9448L9.2456 15.972L9.0064 15.9824L8.5136 15.996L8 16L7.4864 15.996L6.9936 15.9824C6.9128 15.98 6.8328 15.976 6.7544 15.972L6.2912 15.9448L5.8488 15.908C2.0208 15.5368 0.4632 13.9792 0.092 10.1512L0.0552 9.7088L0.0280001 9.2456L0.0176001 9.0064L0.00400009 8.5136C0.00160009 8.3456 0 8.1744 0 8L0.000799942 7.7408L0.00400009 7.4864L0.0176001 6.9936C0.0200001 6.9128 0.0240001 6.8328 0.0280001 6.7544L0.0552 6.2912L0.092 5.8488C0.4632 2.0208 2.0208 0.4632 5.8488 0.092L6.2912 0.0552L6.7544 0.0280001L6.9936 0.0176001L7.4864 0.00400009ZM7.99992 4C7.46451 4 7.04615 4.46228 7.09943 4.99504L7.45017 8.50248C7.47842 8.78492 7.71608 9 7.99992 9C8.28377 9 8.52143 8.78492 8.54968 8.50248L8.90042 4.99504C8.9537 4.46228 8.53533 4 7.99992 4ZM8.00146 10C7.44918 10 7.00146 10.4477 7.00146 11C7.00146 11.5523 7.44918 12 8.00146 12C8.55375 12 9.00146 11.5523 9.00146 11C9.00146 10.4477 8.55375 10 8.00146 10Z"
        fill={color}
      />
    </svg>
  );
};

export default SquircleExclamationFill;
