import { useMemo } from "react";
import { CommonIconProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";
/**
 * React component generated from custom icon: `window`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Window = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_222_998)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0H4.49902L4.50084 -0.0301514L4.9999 0H14C15.1046 0 16 0.895431 16 2V14C16 15.1046 15.1046 16 14 16H2C0.895431 16 0 15.1046 0 14V2C0 0.895431 0.895431 0 2 0ZM4.44298 7.5C4.8917 5.93223 5.22643 3.80721 5.43403 1H7.5V7.5H4.44298ZM4.11346 8.5C4.08442 8.57635 4.05501 8.65093 4.02523 8.72375C3.66404 9.60692 3.23512 10.2659 2.72552 10.7068C2.6788 10.7472 2.63155 10.7857 2.58381 10.8222C3.10388 11.1349 3.54859 11.5766 3.90117 12.0508C4.57374 12.9553 4.99994 14.0919 4.99994 15L7.5 15V8.5H4.11346ZM8.5 8.5V15H11C11 14.1129 11.4299 13.0086 12.1037 12.1326C12.4518 11.6801 12.8878 11.26 13.3955 10.9592C13.3569 10.93 13.3187 10.8996 13.2808 10.8679C12.7699 10.4407 12.3394 9.80143 11.977 8.94482C11.9172 8.80341 11.8589 8.6552 11.802 8.5H8.5ZM11.4841 7.5C11.0469 5.91941 10.7252 3.79277 10.5318 1H8.5V7.5H11.4841ZM3.09964 8.34521C3.69865 6.88056 4.16515 4.54216 4.43123 1H2C1.44772 1 1 1.44772 1 2V10.3621C1.38002 10.3621 1.73257 10.2436 2.07122 9.95055C2.421 9.64792 2.77333 9.14308 3.09964 8.34521ZM1 14V11.3621C1.77597 11.3621 2.52023 11.8695 3.0987 12.6475C3.67613 13.424 3.99994 14.3564 3.99994 15L2 15C1.44772 15 1 14.5523 1 14ZM14 1C14.5523 1 15 1.44772 15 2V10.5C14.6152 10.5 14.2605 10.3837 13.9223 10.1008C13.5738 9.80934 13.2231 9.32357 12.898 8.55518C12.2741 7.08059 11.7933 4.68423 11.5343 1H14ZM12 15H14C14.5523 15 15 14.5523 15 14V11.5C14.2165 11.5 13.4716 11.9944 12.8963 12.7424C12.3201 13.4914 12 14.3871 12 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_222_998">
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
