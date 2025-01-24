import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `receipt-clock`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ReceiptClock = (props: CommonIconProps): JSX.Element => {
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
        d="M3.92602 1.16669C3.62642 1.16669 3.33909 1.2857 3.12725 1.49755C2.9154 1.70939 2.79639 1.99672 2.79639 2.29632V14.3991L4.46348 13.2877C4.66179 13.1555 4.92585 13.1816 5.09438 13.3502L6.37046 14.6262L7.64654 13.3502C7.8418 13.1549 8.15838 13.1549 8.35364 13.3502L9.62972 14.6262L10.9058 13.3502C11.0743 13.1816 11.3384 13.1555 11.5367 13.2877L13.2038 14.3991V11.8335C13.2038 11.5573 13.4277 11.3335 13.7038 11.3335C13.9799 11.3335 14.2038 11.5573 14.2038 11.8335V15.3334C14.2038 15.5178 14.1023 15.6872 13.9397 15.7742C13.7771 15.8612 13.5799 15.8517 13.4264 15.7494L11.3231 14.3471L9.98327 15.6869C9.78801 15.8822 9.47143 15.8822 9.27617 15.6869L8.00009 14.4108L6.72401 15.6869C6.52875 15.8822 6.21217 15.8822 6.01691 15.6869L4.67712 14.3471L2.57374 15.7494C2.42031 15.8517 2.22304 15.8612 2.06046 15.7742C1.89788 15.6872 1.79639 15.5178 1.79639 15.3334V2.29632C1.79639 1.7315 2.02076 1.18982 2.42014 0.790441C2.81952 0.391058 3.3612 0.166687 3.92602 0.166687H8.00009C8.27623 0.166687 8.50009 0.390545 8.50009 0.666687C8.50009 0.942829 8.27623 1.16669 8.00009 1.16669H3.92602Z"
        fill={color}
      />
      <path
        d="M8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V8C7.5 8.17563 7.59215 8.33838 7.74275 8.42875L10.2428 9.92875C10.4795 10.0708 10.7867 9.99404 10.9287 9.75725C11.0708 9.52046 10.994 9.21333 10.7572 9.07125L8.5 7.7169V3.5Z"
        fill={color}
      />
    </svg>
  );
};
