import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `paint-roller-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const PaintRollerFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1055_141)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.59252 0.166687C2.02771 0.166687 1.48603 0.391058 1.08664 0.790441C0.687262 1.18982 0.462891 1.7315 0.462891 2.29632V3.92595C0.462891 4.49076 0.687262 5.03244 1.08664 5.43182C1.48603 5.8312 2.02771 6.05558 2.59252 6.05558H10.7407C11.3055 6.05558 11.8472 5.8312 12.2465 5.43182C12.6459 5.03244 12.8703 4.49076 12.8703 3.92595V3.61113H13.1853C13.4849 3.61113 13.7722 3.73014 13.984 3.94199C14.1959 4.15384 14.3149 4.44116 14.3149 4.74076C14.3149 5.68866 13.9383 6.59774 13.2681 7.26801C12.5978 7.93828 11.6887 8.31483 10.7408 8.31483H6.66675C6.39061 8.31483 6.16675 8.53869 6.16675 8.81483V9.94447H5.85192C5.50321 9.94447 5.16879 10.083 4.92221 10.3296C4.67563 10.5761 4.53711 10.9106 4.53711 11.2593V14.5185C4.53711 14.8673 4.67563 15.2017 4.92221 15.4483C5.16879 15.6948 5.50321 15.8334 5.85192 15.8334H7.48155C7.83026 15.8334 8.16469 15.6948 8.41127 15.4483C8.65784 15.2017 8.79637 14.8673 8.79637 14.5185V11.2593C8.79637 10.9106 8.65784 10.5761 8.41127 10.3296C8.16469 10.083 7.83027 9.94447 7.48155 9.94447H7.16675V9.31483H10.7408C11.9539 9.31483 13.1174 8.83292 13.9752 7.97512C14.833 7.11731 15.3149 5.95388 15.3149 4.74076C15.3149 4.17595 15.0905 3.63427 14.6911 3.23488C14.2918 2.8355 13.7501 2.61113 13.1853 2.61113H12.8703V2.29632C12.8703 1.7315 12.6459 1.18982 12.2465 0.790441C11.8472 0.391058 11.3055 0.166687 10.7407 0.166687H2.59252ZM5.85192 10.9445C5.76843 10.9445 5.68836 10.9776 5.62932 11.0367C5.57028 11.0957 5.53711 11.1758 5.53711 11.2593V14.5185C5.53711 14.602 5.57028 14.6821 5.62932 14.7412C5.68836 14.8002 5.76843 14.8334 5.85192 14.8334H7.48155C7.56505 14.8334 7.64512 14.8002 7.70416 14.7412C7.7632 14.6821 7.79637 14.602 7.79637 14.5185V11.2593C7.79637 11.1758 7.7632 11.0957 7.70416 11.0367C7.64512 10.9776 7.56505 10.9445 7.48155 10.9445H5.85192Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1055_141" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
