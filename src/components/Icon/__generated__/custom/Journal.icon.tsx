import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "../../../../utils";
/**
 * React component generated from custom icon: `journal`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const Journal = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1222_593)" >
        <path
          d="M4.72021 4.21997C4.44407 4.21997 4.22021 4.44383 4.22021 4.71997C4.22021 4.99611 4.44407 5.21997 4.72021 5.21997H8.00021C8.27636 5.21997 8.50021 4.99611 8.50021 4.71997C8.50021 4.44383 8.27636 4.21997 8.00021 4.21997H4.72021Z"
          fill={color}
        />
        <path
          d="M4.22021 8C4.22021 7.72386 4.44407 7.5 4.72021 7.5H8.00021C8.27636 7.5 8.50021 7.72386 8.50021 8C8.50021 8.27614 8.27636 8.5 8.00021 8.5H4.72021C4.44407 8.5 4.22021 8.27614 4.22021 8Z"
          fill={color}
        />
        <path
          d="M4.72021 10.78C4.44407 10.78 4.22021 11.0039 4.22021 11.28C4.22021 11.5562 4.44407 11.78 4.72021 11.78H5.00021C5.27636 11.78 5.50021 11.5562 5.50021 11.28C5.50021 11.0039 5.27636 10.78 5.00021 10.78H4.72021Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.26067 0.940002C1.91059 0.940002 1.57484 1.07907 1.32729 1.32662C1.07975 1.57417 0.940674 1.90992 0.940674 2.26V12.1C0.940674 12.885 1.25253 13.6379 1.80764 14.193C2.36275 14.7481 3.11563 15.06 3.90067 15.06H12.9207C13.4882 15.06 14.0326 14.8345 14.4339 14.4332C14.8352 14.0319 15.0607 13.4876 15.0607 12.92V3.9C15.0607 3.54992 14.9216 3.21417 14.6741 2.96662C14.4265 2.71907 14.0908 2.58 13.7407 2.58H11.7807V2.26C11.7807 1.90992 11.6416 1.57417 11.3941 1.32662C11.1465 1.07907 10.8108 0.940002 10.4607 0.940002H2.26067ZM3.90067 14.06H11.1096C10.8964 13.7213 10.7807 13.3266 10.7807 12.92V2.26C10.7807 2.17513 10.747 2.09374 10.6869 2.03373C10.6269 1.97372 10.5455 1.94 10.4607 1.94H2.26067C2.1758 1.94 2.09441 1.97372 2.0344 2.03373C1.97439 2.09374 1.94067 2.17513 1.94067 2.26V12.1C1.94067 12.6198 2.14717 13.1184 2.51474 13.4859C2.88232 13.8535 3.38085 14.06 3.90067 14.06ZM11.7807 12.92V3.58H13.7407C13.8255 3.58 13.9069 3.61372 13.9669 3.67373C14.027 3.73374 14.0607 3.81513 14.0607 3.9V12.92C14.0607 13.2223 13.9406 13.5123 13.7268 13.7261C13.513 13.9399 13.223 14.06 12.9207 14.06C12.6183 14.06 12.3284 13.9399 12.1146 13.7261C11.9008 13.5123 11.7807 13.2223 11.7807 12.92Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1222_593" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
