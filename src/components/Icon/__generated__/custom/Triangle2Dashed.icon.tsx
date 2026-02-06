import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-dashed`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2Dashed = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_42)" >
        <path
          d="M1.72548 14.4043L1.48426 15H2.0868V16H0.7411L0.67567 15.9961C0.35711 15.9555 0.151998 15.6198 0.277233 15.3115L0.798717 14.0273L1.72548 14.4043ZM5.23329 15V16H4.23329V15H5.23329ZM5.92469 15V16H5.23329V15H5.92469ZM6.92469 15V16H5.92469V15H6.92469ZM10.0712 15V16H9.07118V15H10.0712ZM10.7626 15V16H10.0712V15H10.7626ZM11.7626 15V16H10.7626V15H11.7626ZM15.7186 15.3115C15.8522 15.6403 15.6097 16 15.2548 16H13.9091V15H14.5116L14.2704 14.4043L15.1962 14.0273L15.7186 15.3115ZM3.75673 9.4043L3.38075 10.3311L3.08973 11.0449L2.71376 11.9717L1.787 11.5947L2.82997 9.02734L3.75673 9.4043ZM14.2079 11.5947L13.2821 11.9717L12.9061 11.0449L12.6151 10.3311L12.2391 9.4043L13.1649 9.02734L14.2079 11.5947ZM5.78797 4.4043L5.412 5.33105L5.12098 6.04492L4.74501 6.97168L3.81825 6.59473L4.86122 4.02734L5.78797 4.4043ZM12.1766 6.59473L11.2509 6.97168L10.8749 6.04492L10.5839 5.33105L10.2079 4.4043L11.1337 4.02734L12.1766 6.59473ZM9.16102 0C9.36444 0 9.54827 0.123097 9.62489 0.311523L10.1454 1.59473L9.21962 1.97168L8.84364 1.04492L8.82508 1H7.17079L7.15223 1.04492L6.77626 1.97168L5.8495 1.59473L6.37098 0.311523C6.4476 0.123097 6.63143 0 6.83485 0H9.16102Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_42" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2Dashed;
