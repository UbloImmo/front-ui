import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `building-blocks`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const BuildingBlocks = (props: CommonIconProps): JSX.Element => {
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
        d="M4.49997 0C5.00117 0 5.42496 0.371028 5.4912 0.867831L6.49119 8.36779C6.55978 8.88218 6.22348 9.36356 5.7169 9.47613L1.21692 10.4761C0.920828 10.5419 0.610871 10.4698 0.37427 10.28C0.13767 10.0902 0 9.80326 0 9.49995V0.999994C0 0.447713 0.447713 0 0.999994 0H4.49997ZM0.999994 0.999994H4.49997L5.49997 8.49995L0.999994 9.49995V0.999994Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.24451 0.344796C7.43445 0.125798 7.71007 0 7.99996 0H14.9999C15.5522 0 15.9999 0.447713 15.9999 0.999994V2.99998C15.9999 3.46564 15.6785 3.86966 15.2248 3.97437L8.72482 5.47436C8.45203 5.53731 8.16534 5.48303 7.93445 5.32471C7.70356 5.16639 7.54961 4.91854 7.51001 4.64139L7.01002 1.14141C6.96902 0.854439 7.05457 0.563795 7.24451 0.344796ZM8.49996 4.49997L14.9999 2.99998V0.999994H7.99996L8.49996 4.49997Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.0101 8.14138C7.93763 7.63409 8.26037 7.15411 8.75751 7.02983L14.7575 5.52983C15.0562 5.45515 15.3727 5.52226 15.6154 5.71177C15.8581 5.90128 16 6.19204 16 6.49997V14.9999C16 15.5522 15.5523 15.9999 15 15.9999H10C9.50239 15.9999 9.08047 15.634 9.01009 15.1413L8.0101 8.14138ZM15 14.9999H10L9.00004 7.99996L15 6.49997V14.9999Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 13.4999C0 13.0583 0.289666 12.669 0.712648 12.5421L5.71262 11.0421C5.98768 10.9596 6.28494 10.9993 6.52869 11.1511C6.77243 11.303 6.93914 11.5523 6.98635 11.8355L7.48635 14.8355C7.53468 15.1255 7.45298 15.422 7.26298 15.6463C7.07298 15.8706 6.79391 15.9999 6.49996 15.9999H0.999994C0.447713 15.9999 0 15.5522 0 14.9999V13.4999ZM0.999994 13.4999L5.99997 11.9999L6.49996 14.9999H0.999994V13.4999Z"
        fill={color}
      />
    </svg>
  );
};
