import { useMemo } from "react";

import { CommonIconProps, commonIconDefaulProps } from "../common.types";

import { cssLengthUsage, cssVarUsage, mergeDefaultProps } from "@utils";
/**
 * React component generated from custom icon: `test-pipe-fill`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconProps} [props = commonIconDefaulProps] - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const TestPipeFill = (props: CommonIconProps): JSX.Element => {
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
      <g clipPath="url(#clip0_1222_391)" >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.8536 0.146447C10.6583 -0.0488155 10.3417 -0.0488155 10.1464 0.146447C9.95118 0.341709 9.95118 0.658291 10.1464 0.853553L10.6091 1.31621L0.843799 11.0831C0.303594 11.6235 0.000149622 12.3563 0.000244163 13.1203C0.000338718 13.8844 0.303951 14.6171 0.844289 15.1573C1.38463 15.6975 2.11743 16.001 2.88149 16.0009C3.25981 16.0008 3.63442 15.9263 3.98393 15.7814C4.33343 15.6366 4.65099 15.4244 4.91846 15.1568L14.6833 5.3904L15.1464 5.85355C15.3417 6.04882 15.6583 6.04882 15.8536 5.85355C16.0488 5.65829 16.0488 5.34171 15.8536 5.14645L10.8536 0.146447ZM13.9762 4.68329L11.3162 2.02332L5.00725 8.33331H10.3268L13.9762 4.68329Z"
          fill={color}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.8334 10C13.9716 10 14.1037 10.0572 14.1982 10.158L15.4482 11.4914L15.4584 11.5026C15.7342 11.8153 15.9139 12.201 15.976 12.6133C16.038 13.0257 15.9798 13.4471 15.8082 13.8272C15.6366 14.2072 15.3591 14.5297 15.0088 14.7559C14.6585 14.9821 14.2504 15.1024 13.8334 15.1024C13.4164 15.1024 13.0083 14.9821 12.658 14.7559C12.3078 14.5297 12.0302 14.2072 11.8586 13.8272C11.6871 13.4471 11.6288 13.0257 11.6909 12.6133C11.7529 12.201 11.9326 11.8153 12.2084 11.5026L12.2186 11.4914L13.4686 10.158C13.5632 10.0572 13.6952 10 13.8334 10Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1222_391" >
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
