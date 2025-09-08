import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `triangle2-check`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Triangle2Check = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_70)" >
        <path
          d="M9.64441 8.14648C9.83965 7.95124 10.1562 7.95129 10.3514 8.14648C10.5467 8.34175 10.5467 8.65825 10.3514 8.85352L7.35145 11.8535C7.15618 12.0487 6.83966 12.0488 6.64442 11.8535L5.14442 10.3535C4.94924 10.1583 4.94924 9.84173 5.14442 9.64648C5.33966 9.45124 5.65618 9.45129 5.85145 9.64648L6.99793 10.793L9.64441 8.14648Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.16102 0C9.36443 0 9.54826 0.123102 9.62488 0.311523L15.7186 15.3115C15.8522 15.6403 15.6096 16 15.2548 16H0.741095L0.675665 15.9961C0.35712 15.9555 0.152003 15.6198 0.277228 15.3115L6.37098 0.311523C6.43805 0.146567 6.58716 0.0319463 6.75965 0.00585938L6.83485 0H9.16102ZM1.48328 15H14.5126L8.82508 1H7.17078L1.48328 15Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_70" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
