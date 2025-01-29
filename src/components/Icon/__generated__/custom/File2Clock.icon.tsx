import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `file2-clock`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const File2Clock = (props: CommonIconProps): JSX.Element => {
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
        d="M10.5562 1.15997H9.53369V0.159973H10.5562V1.15997Z"
        fill={color}
      />
      <path
        d="M12.0899 1.15997H11.5787V0.159973H12.0899C12.3819 0.159973 12.6615 0.218172 12.9169 0.324072L12.5338 1.2478C12.3978 1.19137 12.2481 1.15997 12.0899 1.15997Z"
        fill={color}
      />
      <path
        d="M13.2499 2.31997C13.2499 2.16177 13.2185 2.01215 13.1621 1.87607L14.0858 1.49302C14.1917 1.74839 14.2499 2.02802 14.2499 2.31997V2.79639H13.2499V2.31997Z"
        fill={color}
      />
      <path
        d="M13.2499 4.70204V3.74921H14.2499V4.70204H13.2499Z"
        fill={color}
      />
      <path
        d="M13.2499 6.60769V5.65487H14.2499V6.60769H13.2499Z"
        fill={color}
      />
      <path
        d="M13.2499 8.51335V7.56052H14.2499V8.51335H13.2499Z"
        fill={color}
      />
      <path d="M13.2499 10.419V9.46618H14.2499V10.419H13.2499Z" fill={color} />
      <path
        d="M3.92602 1.16669C3.62642 1.16669 3.33909 1.2857 3.12725 1.49755C2.9154 1.70939 2.79639 1.99672 2.79639 2.29632L2.79642 13.7037C2.79642 14.0033 2.91544 14.2906 3.12728 14.5025C3.33913 14.7143 3.62646 14.8334 3.92605 14.8334L12.0742 14.8334C12.3738 14.8334 12.6611 14.7143 12.873 14.5025C13.0848 14.2906 13.2038 14.0033 13.2038 13.7037L13.2038 11.8326C13.2038 11.5565 13.4277 11.3326 13.7038 11.3326C13.98 11.3326 14.2038 11.5565 14.2038 11.8326L14.2038 13.7037C14.2038 14.2685 13.9795 14.8102 13.5801 15.2096C13.1807 15.609 12.639 15.8334 12.0742 15.8334L3.92605 15.8334C3.36124 15.8334 2.81956 15.609 2.42018 15.2096C2.02079 14.8102 1.79642 14.2685 1.79642 13.7037L1.79639 2.29632C1.79639 1.7315 2.02076 1.18982 2.42014 0.790441C2.81952 0.391058 3.3612 0.166687 3.92602 0.166687H8.00009C8.27623 0.166687 8.50009 0.390545 8.50009 0.666687C8.50009 0.942829 8.27623 1.16669 8.00009 1.16669H3.92602Z"
        fill={color}
      />
      <path
        d="M8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V8C7.5 8.17563 7.59215 8.33838 7.74275 8.42875L10.2428 9.92875C10.4795 10.0708 10.7867 9.99404 10.9287 9.75725C11.0708 9.52046 10.994 9.21333 10.7572 9.07125L8.5 7.7169V3.5Z"
        fill={color}
      />
    </svg>
  );
};
