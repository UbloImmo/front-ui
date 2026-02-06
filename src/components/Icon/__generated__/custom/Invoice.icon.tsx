import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `invoice`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Invoice = (props: CommonIconProps): JSX.Element => {
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
        d="M3.12725 1.49755C3.3391 1.2857 3.62642 1.16669 3.92602 1.16669H12.0742C12.3738 1.16669 12.6611 1.2857 12.873 1.49755C13.0848 1.7094 13.2038 1.99672 13.2038 2.29632L13.2038 10.7222H11.5185C10.9537 10.7222 10.4121 10.9466 10.0127 11.346C9.61329 11.7454 9.38892 12.287 9.38892 12.8519V14.8334L3.92606 14.8334C3.62646 14.8334 3.33913 14.7143 3.12729 14.5025C2.91544 14.2906 2.79642 14.0033 2.79642 13.7037L2.79639 2.29632C2.79639 1.99672 2.9154 1.7094 3.12725 1.49755ZM10.3889 14.725C10.7766 14.301 11.253 13.7131 11.739 13.1046L11.9686 12.8167C12.275 12.4323 12.5784 12.0516 12.8517 11.7222H11.5185C11.2189 11.7222 10.9316 11.8412 10.7198 12.0531C10.5079 12.2649 10.3889 12.5523 10.3889 12.8519V14.725ZM3.92602 0.166687C3.36121 0.166687 2.81953 0.391058 2.42014 0.790441C2.02076 1.18982 1.79639 1.7315 1.79639 2.29632L1.79642 13.7037C1.79642 14.2685 2.0208 14.8102 2.42018 15.2096C2.81956 15.609 3.36125 15.8334 3.92606 15.8334L10.5 15.8334C10.6326 15.8334 10.7598 15.7807 10.8536 15.6869C11.3218 15.2187 11.9375 14.4584 12.5203 13.7287L12.7522 13.438C13.2609 12.8 13.7312 12.21 14.0724 11.8379C14.1569 11.7457 14.2038 11.6251 14.2038 11.5L14.2038 2.29632C14.2038 1.7315 13.9795 1.18982 13.5801 0.790441C13.1807 0.391058 12.639 0.166687 12.0742 0.166687H3.92602Z"
        fill={color}
      />
    </svg>
  );
};

export default Invoice;
