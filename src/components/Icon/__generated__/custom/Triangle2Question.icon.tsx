import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";

/**
 * React component generated from custom icon: `triangle2-question`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
const Triangle2Question = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1422_52)" >
        <path
          d="M9.16102 0C9.36444 0 9.54827 0.123097 9.62489 0.311523L15.7186 15.3115C15.8522 15.6403 15.6097 16 15.2548 16H0.7411L0.67567 15.9961C0.35711 15.9555 0.151998 15.6198 0.277233 15.3115L6.37098 0.311523C6.43806 0.14656 6.58716 0.03194 6.75965 0.00585938L6.83485 0H9.16102ZM1.48329 15H14.5126L8.82508 1H7.17079L1.48329 15Z"
          fill={color}
        />
        <path
          d="M5.99821 7.4754C5.99248 7.5782 6.0773 7.66149 6.18027 7.66149H6.80252C6.90673 7.66149 6.98958 7.57652 7.00358 7.47326C7.07072 6.97806 7.41058 6.61712 8.01641 6.61712C8.5338 6.61712 9.00808 6.87581 9.00808 7.4986C9.00808 7.97767 8.72543 8.19804 8.2799 8.53339C7.77208 8.90228 7.36967 9.33344 7.39841 10.0329L7.40065 10.1965C7.40206 10.2997 7.48612 10.3826 7.58931 10.3826H8.2014C8.30561 10.3826 8.39008 10.2981 8.39008 10.1939V10.1143C8.39008 9.57297 8.59608 9.41488 9.1518 8.9933C9.61171 8.64358 10.0908 8.25553 10.0908 7.44111C10.0908 6.30093 9.12785 5.75 8.0739 5.75C7.11761 5.75 6.06955 6.19575 5.99821 7.4754ZM7.17325 11.8246C7.17325 12.227 7.49422 12.524 7.93497 12.524C8.39487 12.524 8.71106 12.227 8.71106 11.8246C8.71106 11.4078 8.39487 11.1156 7.93497 11.1156C7.49422 11.1156 7.17325 11.4078 7.17325 11.8246Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1422_52" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Triangle2Question;
