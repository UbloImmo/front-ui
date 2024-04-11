import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `building-blocks-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const BuildingBlocksFill = (props: CommonIconProps): JSX.Element => {
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
        d="M5.4912 0.867831C5.42496 0.371028 5.00117 0 4.49997 0H0.999994C0.447713 0 0 0.447713 0 0.999994V9.49995C0 9.80326 0.13767 10.0902 0.37427 10.28C0.610871 10.4698 0.920828 10.5419 1.21692 10.4761L5.7169 9.47613C6.22348 9.36356 6.55978 8.88218 6.49119 8.36779L5.4912 0.867831Z"
        fill={color}
      />
      <path
        d="M7.99996 0C7.71007 0 7.43445 0.125798 7.24451 0.344796C7.05457 0.563795 6.96902 0.854439 7.01002 1.14141L7.51001 4.64139C7.54961 4.91854 7.70356 5.16639 7.93445 5.32471C8.16534 5.48303 8.45203 5.53731 8.72482 5.47436L15.2248 3.97437C15.6785 3.86966 15.9999 3.46564 15.9999 2.99998V0.999994C15.9999 0.447713 15.5522 0 14.9999 0H7.99996Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75751 7.02981C8.26037 7.1541 7.93763 7.63408 8.0101 8.14137L9.01009 15.1413C9.08047 15.634 9.50239 15.9999 10 15.9999H15C15.5523 15.9999 16 15.5522 16 14.9999V6.49996C16 6.19202 15.8581 5.90126 15.6154 5.71176C15.3727 5.52225 15.0562 5.45513 14.7575 5.52982L8.75751 7.02981Z"
        fill={color}
      />
      <path
        d="M0.712648 12.5421C0.289666 12.669 0 13.0583 0 13.4999V14.9999C0 15.5522 0.447713 15.9999 0.999994 15.9999H6.49996C6.79391 15.9999 7.07298 15.8706 7.26298 15.6463C7.45298 15.422 7.53468 15.1255 7.48635 14.8355L6.98635 11.8355C6.93914 11.5523 6.77243 11.303 6.52869 11.1511C6.28494 10.9993 5.98768 10.9596 5.71262 11.0421L0.712648 12.5421Z"
        fill={color}
      />
    </svg>
  );
};
