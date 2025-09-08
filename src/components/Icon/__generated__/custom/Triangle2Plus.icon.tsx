import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-plus`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2Plus = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_46)" >
        <path
          d="M7.82601 6.375C8.17118 6.37499 8.451 6.65482 8.45101 7V9.20312H10.6551C11 9.20323 11.2799 9.48323 11.2801 9.82812C11.2801 10.1732 11.0002 10.453 10.6551 10.4531H8.45198V12.6572C8.45183 13.0021 8.17188 13.282 7.82698 13.2822C7.48194 13.2822 7.20214 13.0022 7.20198 12.6572V10.4531H4.99788C4.65275 10.4531 4.37288 10.1733 4.37288 9.82812C4.37314 9.4832 4.65291 9.20318 4.99788 9.20312H7.20101V7C7.20101 6.65502 7.48109 6.37531 7.82601 6.375Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16097 0C9.36436 0 9.54819 0.123144 9.62483 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2547 16H0.741045L0.675616 15.9961C0.357216 15.9553 0.152044 15.6197 0.277178 15.3115L6.37093 0.311523C6.43798 0.146633 6.5872 0.0320071 6.7596 0.00585938L6.8348 0H9.16097ZM1.48323 15H14.5125L8.82503 1H7.17073L1.48323 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_46" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
